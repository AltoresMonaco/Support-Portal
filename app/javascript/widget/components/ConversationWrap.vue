<script>
import ChatMessage from 'widget/components/ChatMessage.vue';
import AgentTypingBubble from 'widget/components/AgentTypingBubble.vue';
import DateSeparator from 'shared/components/DateSeparator.vue';
import Spinner from 'shared/components/Spinner.vue';
import { useDarkMode } from 'widget/composables/useDarkMode';
import { MESSAGE_TYPE } from 'shared/constants/messages';
import { mapActions, mapGetters } from 'vuex';
import { ON_AGENT_MESSAGE_FOCUS } from '../constants/widgetBusEvents';
import { emitter } from '../../shared/helpers/mitt';

export default {
  name: 'ConversationWrap',
  components: {
    ChatMessage,
    AgentTypingBubble,
    DateSeparator,
    Spinner,
  },
  props: {
    groupedMessages: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const { darkMode } = useDarkMode();
    return { darkMode };
  },
  data() {
    return {
      previousScrollHeight: 0,
      previousConversationSize: 0,
      liveRegionText: '',
    };
  },
  computed: {
    ...mapGetters({
      earliestMessage: 'conversation/getEarliestMessage',
      lastMessage: 'conversation/getLastMessage',
      allMessagesLoaded: 'conversation/getAllMessagesLoaded',
      isFetchingList: 'conversation/getIsFetchingList',
      conversationSize: 'conversation/getConversationSize',
      isAgentTyping: 'conversation/getIsAgentTyping',
      conversationAttributes: 'conversationAttributes/getConversationParams',
    }),
    colorSchemeClass() {
      return `${this.darkMode === 'dark' ? 'dark-scheme' : 'light-scheme'}`;
    },
    showStatusIndicator() {
      const { status } = this.conversationAttributes;
      const isConversationInPendingStatus = status === 'pending';
      const isLastMessageIncoming =
        this.lastMessage.message_type === MESSAGE_TYPE.INCOMING;
      return (
        this.isAgentTyping ||
        (isConversationInPendingStatus && isLastMessageIncoming)
      );
    },
  },
  watch: {
    allMessagesLoaded() {
      this.previousScrollHeight = 0;
    },
  },
  mounted() {
    this.$el.addEventListener('scroll', this.handleScroll);
    this.scrollToBottom();
    // Écouter l'événement de focus pour les messages d'agent
    emitter.on(ON_AGENT_MESSAGE_FOCUS, this.focusAgentMessage);
  },
  updated() {
    if (this.previousConversationSize !== this.conversationSize) {
      this.previousConversationSize = this.conversationSize;
      this.scrollToBottom();
    }
  },
  unmounted() {
    this.$el.removeEventListener('scroll', this.handleScroll);
    emitter.off(ON_AGENT_MESSAGE_FOCUS, this.focusAgentMessage);
  },
  methods: {
    ...mapActions('conversation', ['fetchOldConversations']),
    scrollToBottom() {
      const container = this.$el;
      container.scrollTop = container.scrollHeight - this.previousScrollHeight;
      this.previousScrollHeight = 0;
    },
    handleScroll() {
      if (
        this.isFetchingList ||
        this.allMessagesLoaded ||
        !this.conversationSize
      ) {
        return;
      }

      if (this.$el.scrollTop < 100) {
        this.fetchOldConversations({ before: this.earliestMessage.id });
        this.previousScrollHeight = this.$el.scrollHeight;
      }
    },
    focusAgentMessage({ messageId, agentName, messageContent }) {
      // Attendre que le DOM soit mis à jour avec le nouveau message
      this.$nextTick(() => {
        const messageElement = document.getElementById(`cwmsg-${messageId}`);
        if (messageElement) {
          // Faire défiler vers le message
          messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          // Déplacer le focus vers le message
          messageElement.focus();
        }

        // Mettre à jour la région aria-live pour annoncer le nouveau message
        // Format: "Agent: contenu du message"
        if (agentName) {
          let announcementText = '';
          
          if (messageContent) {
            // Nettoyer le HTML du contenu pour l'annonce
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = messageContent;
            const textContent = tempDiv.textContent || tempDiv.innerText || '';
            
            if (textContent.trim()) {
              // Limiter la longueur pour éviter des annonces trop longues
              const maxLength = 200;
              const truncatedContent =
                textContent.length > maxLength
                  ? `${textContent.substring(0, maxLength)}...`
                  : textContent;
              announcementText = `${agentName}: ${truncatedContent}`;
            }
          }
          
          // Seulement annoncer si on a du contenu texte à annoncer
          if (announcementText) {
            // Réinitialiser d'abord pour forcer la mise à jour
            this.liveRegionText = '';
            
            // Mettre à jour la région live avec un délai pour s'assurer que le DOM est prêt
            setTimeout(() => {
              this.liveRegionText = announcementText;
            }, 50);
          }
        }
      });
    },
  },
};
</script>

<template>
  <div class="conversation--container" :class="colorSchemeClass">
    <!-- Région aria-live pour annoncer les nouveaux messages d'agent -->
    <div
      aria-live="polite"
      aria-atomic="true"
      class="sr-only"
      role="status"
    >
      {{ liveRegionText }}
    </div>
    <div class="conversation-wrap" :class="{ 'is-typing': isAgentTyping }">
      <div v-if="isFetchingList" class="message--loader">
        <Spinner />
      </div>
      <div
        v-for="groupedMessage in groupedMessages"
        :key="groupedMessage.date"
        class="messages-wrap"
      >
        <DateSeparator :date="groupedMessage.date" />
        <ChatMessage
          v-for="message in groupedMessage.messages"
          :key="message.id"
          :message="message"
        />
      </div>
      <AgentTypingBubble v-if="showStatusIndicator" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.conversation--container {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  color-scheme: light dark;

  &.light-scheme {
    color-scheme: light;
  }

  &.dark-scheme {
    color-scheme: dark;
  }
}

.conversation-wrap {
  flex: 1;
  @apply px-2 pt-8 pb-2;
}

.message--loader {
  text-align: center;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
