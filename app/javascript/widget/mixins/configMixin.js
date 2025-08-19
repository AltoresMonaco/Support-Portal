export default {
  computed: {
    useInboxAvatarForBot() {
      return this.channelConfig.enabledFeatures.includes(
        'use_inbox_avatar_for_bot'
      );
    },
    hasAConnectedAgentBot() {
      return !!window.chatwootWebChannel.hasAConnectedAgentBot;
    },
    inboxAvatarUrl() {
      return window.chatwootWebChannel.avatarUrl;
    },
    channelConfig() {
      return window.chatwootWebChannel;
    },
    hasEmojiPickerEnabled() {
      return this.channelConfig.enabledFeatures.includes('emoji_picker');
    },
    hasAttachmentsEnabled() {
      return this.channelConfig.enabledFeatures.includes('attachments');
    },
    hasEndConversationEnabled() {
      return this.channelConfig.enabledFeatures.includes('end_conversation');
    },
    preChatFormEnabled() {
      return window.chatwootWebChannel.preChatFormEnabled;
    },
    preChatFormOptions() {
      let preChatMessage = '';
      const options = window.chatwootWebChannel.preChatFormOptions || {};
      preChatMessage = options.pre_chat_message;
      const { pre_chat_fields: preChatFields = [] } = options;
      return {
        preChatMessage,
        preChatFields,
      };
    },
    shouldShowPreChatForm() {
      const { preChatFields } = this.preChatFormOptions;
      // Check if at least one enabled field in pre-chat fields
      const hasEnabledFields =
        preChatFields.filter(field => field.enabled).length > 0;
      return this.preChatFormEnabled && hasEnabledFields;
    },
    welcomeTitle() {
      return this.channelConfig.welcome_title || this.$t('WELCOME_HEADING');
    },
    welcomeTagline() {
      return this.channelConfig.welcome_tagline || this.$t('WELCOME_TAGLINE');
    },
    offlineMessage() {
      return (
        this.channelConfig.offline_message ||
        this.$t('TEAM_AVAILABILITY.OFFLINE')
      );
    },
    replyTimeMessage() {
      return (
        this.channelConfig.reply_time_message ||
        this.$t('REPLY_TIME.IN_A_FEW_MINUTES')
      );
    },
    channelGreeting() {
      return this.channelConfig.channel_greeting || '';
    },
  },
};
