<script>
import { mapGetters } from 'vuex';
import ContactPanel from 'dashboard/routes/dashboard/conversation/ContactPanel.vue';
import ConversationHeader from './ConversationHeader.vue';
import DashboardAppFrame from '../DashboardApp/Frame.vue';
import EmptyState from './EmptyState/EmptyState.vue';
import MessagesView from './MessagesView.vue';

export default {
  components: {
    ContactPanel,
    ConversationHeader,
    DashboardAppFrame,
    EmptyState,
    MessagesView,
  },

  props: {
    inboxId: {
      type: [Number, String],
      default: '',
      required: false,
    },
    isInboxView: {
      type: Boolean,
      default: false,
    },
    isContactPanelOpen: {
      type: Boolean,
      default: true,
    },
    isOnExpandedLayout: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return { activeIndex: 0 };
  },
  computed: {
    ...mapGetters({
      currentChat: 'getSelectedChat',
      dashboardApps: 'dashboardApps/getRecords',
    }),
    dashboardAppTabs() {
      return [
        {
          key: 'messages',
          name: this.$t('CONVERSATION.DASHBOARD_APP_TAB_MESSAGES'),
        },
        ...this.dashboardApps.map(dashboardApp => ({
          key: `dashboard-${dashboardApp.id}`,
          name: dashboardApp.title,
        })),
      ];
    },
    showContactPanel() {
      return this.isContactPanelOpen && this.currentChat.id;
    },
  },
  watch: {
    'currentChat.inbox_id'(inboxId) {
      if (inboxId) {
        this.$store.dispatch('inboxAssignableAgents/fetch', [inboxId]);
      }
    },
    'currentChat.id'() {
      this.fetchLabels();
      this.activeIndex = 0;
    },
  },
  mounted() {
    this.fetchLabels();
    this.$store.dispatch('dashboardApps/get');
  },
  methods: {
    fetchLabels() {
      if (!this.currentChat.id) {
        return;
      }
      this.$store.dispatch('conversationLabels/get', this.currentChat.id);
    },
    onToggleContactPanel() {
      this.$emit('contactPanelToggle');
    },
    onDashboardAppTabChange(index) {
      this.activeIndex = index;
    },
  },
};
</script>

<template>
  <div
    class="conversation-details-wrap bg-slate-25 dark:bg-slate-800"
    :class="{ 'with-border-right': !isOnExpandedLayout }"
  >
    <ConversationHeader
      v-if="currentChat.id"
      :chat="currentChat"
      :is-inbox-view="isInboxView"
      :is-contact-panel-open="isContactPanelOpen"
      :show-back-button="isOnExpandedLayout && !isInboxView"
      @contactPanelToggle="onToggleContactPanel"
    />
    <woot-tabs
      v-if="dashboardApps.length && currentChat.id"
      :index="activeIndex"
      class="-mt-px bg-white dashboard-app--tabs dark:bg-slate-900"
      @change="onDashboardAppTabChange"
    >
      <woot-tabs-item
        v-for="(tab, index) in tabs"
        :key="tab.key"
        :name="tab.name"
        :show-badge="false"
        :index="index"
      />
    </woot-tabs>
    <div
      v-show="!activeIndex"
      class="flex h-full min-h-0 m-0 bg-slate-25 dark:bg-slate-800"
    >
      <MessagesView
        v-if="currentChat.id"
        :inbox-id="inboxId"
        :is-inbox-view="isInboxView"
        :is-contact-panel-open="isContactPanelOpen"
        @contactPanelToggle="onToggleContactPanel"
      />
      <EmptyState
        v-if="!currentChat.id && !isInboxView"
        :is-on-expanded-layout="isOnExpandedLayout"
      />
      <div
        v-show="showContactPanel"
        class="conversation-sidebar-wrap basis-full sm:basis-[17.5rem] md:basis-[18.75rem] lg:basis-[19.375rem] xl:basis-[20.625rem] 2xl:basis-[25rem] rtl:border-r border-slate-50 dark:border-slate-700 h-auto overflow-auto z-10 flex-shrink-0 flex-grow-0"
      >
        <ContactPanel
          v-if="showContactPanel"
          :conversation-id="currentChat.id"
          :inbox-id="currentChat.inbox_id"
          :on-toggle="onToggleContactPanel"
        />
      </div>
    </div>
    <DashboardAppFrame
      v-for="(dashboardApp, index) in dashboardApps"
      v-show="activeIndex - 1 === index"
      :key="currentChat.id + '-' + dashboardApp.id"
      :is-visible="activeIndex - 1 === index"
      :config="dashboardApps[index].content"
      :position="index"
      :current-chat="currentChat"
    />
  </div>
</template>

<style lang="scss" scoped>
.conversation-details-wrap {
  @apply flex flex-col min-w-0 w-full;

  &.with-border-right {
    @apply border-r border-slate-50 dark:border-slate-700;
  }
}

.dashboard-app--tabs {
  ::v-deep {
    .tabs-title {
      a {
        @apply pb-2 pt-1;
      }
    }
  }
}

.conversation-sidebar-wrap {
  &::v-deep .contact--panel {
    @apply w-full h-full max-w-full;
  }
}
</style>
