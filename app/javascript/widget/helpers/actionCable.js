import BaseActionCableConnector from '../../shared/helpers/BaseActionCableConnector';
import { playNewMessageNotificationInWidget } from 'widget/helpers/WidgetAudioNotificationHelper';
import {
  ON_AGENT_MESSAGE_RECEIVED,
  ON_AGENT_MESSAGE_FOCUS,
} from '../constants/widgetBusEvents';
import { IFrameHelper } from 'widget/helpers/utils';
import { shouldTriggerMessageUpdateEvent } from './IframeEventHelper';
import { CHATWOOT_ON_MESSAGE } from '../constants/sdkEvents';
import { emitter } from '../../shared/helpers/mitt';

const isMessageInActiveConversation = (getters, message) => {
  const { conversation_id: conversationId } = message;
  const activeConversationId =
    getters['conversationAttributes/getConversationParams'].id;
  return activeConversationId && conversationId !== activeConversationId;
};

class ActionCableConnector extends BaseActionCableConnector {
  constructor(app, pubsubToken) {
    super(app, pubsubToken);
    this.events = {
      'message.created': this.onMessageCreated,
      'message.updated': this.onMessageUpdated,
      'conversation.typing_on': this.onTypingOn,
      'conversation.typing_off': this.onTypingOff,
      'conversation.status_changed': this.onStatusChange,
      'conversation.created': this.onConversationCreated,
      'presence.update': this.onPresenceUpdate,
      'contact.merged': this.onContactMerge,
    };
  }

  onDisconnected = () => {
    this.setLastMessageId();
  };

  onReconnect = () => {
    this.syncLatestMessages();
  };

  setLastMessageId = () => {
    this.app.$store.dispatch('conversation/setLastMessageId');
  };

  syncLatestMessages = () => {
    this.app.$store.dispatch('conversation/syncLatestMessages');
  };

  onStatusChange = data => {
    if (data.status === 'resolved') {
      this.app.$store.dispatch('campaign/resetCampaign');
    }
    this.app.$store.dispatch('conversationAttributes/update', data);
  };

  onMessageCreated = data => {
    if (isMessageInActiveConversation(this.app.$store.getters, data)) {
      return;
    }

    const isAgentMessage = data.sender_type !== 'User';

    this.app.$store
      .dispatch('conversation/addOrUpdateMessage', data)
      .then(() => {
        emitter.emit(ON_AGENT_MESSAGE_RECEIVED);
        // Émettre l'événement de focus pour les messages d'agent
        if (isAgentMessage) {
          const agentName =
            data.sender?.available_name ||
            data.sender?.name ||
            'Agent';
          const messageContent = data.content || '';
          emitter.emit(ON_AGENT_MESSAGE_FOCUS, {
            messageId: data.id,
            agentName,
            messageContent,
          });
        }
      });

    IFrameHelper.sendMessage({
      event: 'onEvent',
      eventIdentifier: CHATWOOT_ON_MESSAGE,
      data,
    });
    if (data.sender_type === 'User') {
      playNewMessageNotificationInWidget();
    }
  };

  onMessageUpdated = data => {
    if (isMessageInActiveConversation(this.app.$store.getters, data)) {
      return;
    }

    if (shouldTriggerMessageUpdateEvent(data)) {
      IFrameHelper.sendMessage({
        event: 'onEvent',
        eventIdentifier: CHATWOOT_ON_MESSAGE,
        data,
      });
    }

    this.app.$store.dispatch('conversation/addOrUpdateMessage', data);
  };

  onConversationCreated = () => {
    this.app.$store.dispatch('conversationAttributes/getAttributes');
  };

  onPresenceUpdate = data => {
    this.app.$store.dispatch('agent/updatePresence', data.users);
  };

  // eslint-disable-next-line class-methods-use-this
  onContactMerge = data => {
    const { pubsub_token: pubsubToken } = data;
    ActionCableConnector.refreshConnector(pubsubToken);
  };

  onTypingOn = data => {
    const activeConversationId =
      this.app.$store.getters['conversationAttributes/getConversationParams']
        .id;
    const isUserTypingOnAnotherConversation =
      data.conversation && data.conversation.id !== activeConversationId;

    if (isUserTypingOnAnotherConversation || data.is_private) {
      return;
    }
    this.clearTimer();
    this.app.$store.dispatch('conversation/toggleAgentTyping', {
      status: 'on',
    });
    this.initTimer();
  };

  onTypingOff = () => {
    this.clearTimer();
    this.app.$store.dispatch('conversation/toggleAgentTyping', {
      status: 'off',
    });
  };

  clearTimer = () => {
    if (this.CancelTyping) {
      clearTimeout(this.CancelTyping);
      this.CancelTyping = null;
    }
  };

  initTimer = () => {
    // Turn off typing automatically after 30 seconds
    this.CancelTyping = setTimeout(() => {
      this.onTypingOff();
    }, 30000);
  };
}

export default ActionCableConnector;
