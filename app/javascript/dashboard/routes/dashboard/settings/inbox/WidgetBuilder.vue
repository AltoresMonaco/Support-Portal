<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import NextButton from 'dashboard/components-next/button/Button.vue';
import { useAlert } from 'dashboard/composables';
import { LOCAL_STORAGE_KEYS } from 'dashboard/constants/localStorage';
import Widget from 'dashboard/modules/widget-preview/components/Widget.vue';
import MultiselectDropdown from 'shared/components/ui/MultiselectDropdown.vue';
import localesMap from 'shared/constants/locales.js';
import { LocalStorage } from 'shared/helpers/localStorage';
import { mapGetters } from 'vuex';
import InputRadioGroup from './components/InputRadioGroup.vue';

export default {
  components: {
    Widget,
    InputRadioGroup,
    NextButton,
    MultiselectDropdown,
  },
  props: {
    inbox: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      isWidgetPreview: true,
      color: '#1f93ff',
      websiteName: '',
      replyTime: 'in_a_few_minutes',
      avatarFile: null,
      avatarUrl: '',
      widgetBubblePosition: 'right',
      widgetBubbleLauncherTitle: this.$t(
        'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.WIDGET_BUBBLE_LAUNCHER_TITLE.DEFAULT'
      ),
      widgetBubbleType: 'standard',
      widgetBubblePositions: [
        {
          id: 'left',
          title: this.$t(
            'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.WIDGET_BUBBLE_POSITION.LEFT'
          ),
          checked: false,
        },
        {
          id: 'right',
          title: this.$t(
            'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.WIDGET_BUBBLE_POSITION.RIGHT'
          ),
          checked: true,
        },
      ],
      widgetBubbleTypes: [
        {
          id: 'standard',
          title: this.$t(
            'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.WIDGET_BUBBLE_TYPE.STANDARD'
          ),
          checked: true,
        },
        {
          id: 'expanded_bubble',
          title: this.$t(
            'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.WIDGET_BUBBLE_TYPE.EXPANDED_BUBBLE'
          ),
          checked: false,
        },
      ],
      // Per-field active locale and translations
      welcomeHeadingActiveLocale: 'en',
      welcomeHeadingTranslations: { en: '' },
      welcomeTaglineActiveLocale: 'en',
      welcomeTaglineTranslations: { en: '' },
      replyTimeMessageActiveLocale: 'en',
      replyTimeMessageTranslations: { en: '' },
      // All locale options
      allLocaleOptions: Object.entries(localesMap).map(([id, name]) => ({
        id,
        name,
      })),
      // New: local copy of inbox
      currentInbox: this.inbox,
    };
  },
  computed: {
    currentWelcomeHeading: {
      get() {
        return (
          this.welcomeHeadingTranslations[this.welcomeHeadingActiveLocale] || ''
        );
      },
      set(val) {
        this.welcomeHeadingTranslations[this.welcomeHeadingActiveLocale] = val;
      },
    },
    currentWelcomeTagline: {
      get() {
        return (
          this.welcomeTaglineTranslations[this.welcomeTaglineActiveLocale] || ''
        );
      },
      set(val) {
        this.welcomeTaglineTranslations[this.welcomeTaglineActiveLocale] = val;
      },
    },
    currentReplyTimeMessage: {
      get() {
        return (
          this.replyTimeMessageTranslations[
            this.replyTimeMessageActiveLocale
          ] || ''
        );
      },
      set(val) {
        this.replyTimeMessageTranslations[this.replyTimeMessageActiveLocale] =
          val;
      },
    },
    ...mapGetters({
      uiFlags: 'inboxes/getUIFlags',
    }),
    storageKey() {
      return `${LOCAL_STORAGE_KEYS.WIDGET_BUILDER}${this.inbox.id}`;
    },
    widgetScript() {
      let options = {
        position: this.widgetBubblePosition,
        type: this.widgetBubbleType,
        launcherTitle: this.widgetBubbleLauncherTitle,
      };
      let script = this.inbox.web_widget_script;
      return (
        script.substring(0, 13) +
        this.$t('INBOX_MGMT.WIDGET_BUILDER.SCRIPT_SETTINGS', {
          options: JSON.stringify(options),
        }) +
        script.substring(13)
      );
    },
    getWidgetViewOptions() {
      return [
        {
          id: 'preview',
          title: this.$t(
            'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.WIDGET_VIEW_OPTION.PREVIEW'
          ),
          checked: true,
        },
        {
          id: 'script',
          title: this.$t(
            'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.WIDGET_VIEW_OPTION.SCRIPT'
          ),
          checked: false,
        },
      ];
    },
    getReplyTimeOptions() {
      return [
        {
          key: 'in_a_few_minutes',
          value: 'in_a_few_minutes',
          text: this.$t(
            'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.REPLY_TIME.IN_A_FEW_MINUTES'
          ),
        },
        {
          key: 'in_a_few_hours',
          value: 'in_a_few_hours',
          text: this.$t(
            'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.REPLY_TIME.IN_A_FEW_HOURS'
          ),
        },
        {
          key: 'in_a_day',
          value: 'in_a_day',
          text: this.$t(
            'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.REPLY_TIME.IN_A_DAY'
          ),
        },
        {
          key: 'custom',
          value: 'custom',
          text: this.$t(
            'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.REPLY_TIME.CUSTOM'
          ),
        },
      ];
    },
    websiteNameValidationErrorMsg() {
      return this.v$.websiteName.$error
        ? this.$t('INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.WEBSITE_NAME.ERROR')
        : '';
    },
  },
  watch: {
    // Re-run defaults when inbox data is fetched/updated so that
    // translated properties are populated correctly after page reloads.
    inbox: {
      deep: true,
      immediate: true,
      handler(newInbox) {
        // If the new inbox has data, update local copy and reset fields
        if (newInbox && Object.keys(newInbox).length) {
          this.currentInbox = newInbox;
          this.setDefaults();
        }
      },
    },
  },
  mounted() {
    // Ensure currentInbox is initialized before setDefaults
    this.currentInbox = this.inbox;
    this.setDefaults();
  },
  validations: {
    websiteName: { required },
  },
  methods: {
    setDefaults() {
      const parseJSON = val => {
        if (typeof val === 'string') {
          try {
            return JSON.parse(val);
          } catch (e) {
            return {};
          }
        }
        return val || {};
      };
      if (!this.currentInbox) return;
      // Use currentInbox instead of this.inbox
      const {
        name,
        welcome_title,
        welcome_tagline,
        widget_color,
        reply_time,
        avatar_url,
        locale: inboxLocale, // assuming backend sends `locale`
        language: inboxLanguage, // fallback if named `language`
        channel = {},
      } = this.currentInbox;
      // Preferred locale derives from inbox locale, else UI locale, else 'en'
      const preferredLocale =
        inboxLocale ||
        inboxLanguage ||
        (this.$i18n && this.$i18n.locale) ||
        'en';
      this.websiteName = name;
      // Set translation objects first, then set the main fields from the active locale
      this.color = widget_color;
      this.replyTime = reply_time;
      this.avatarUrl = avatar_url;

      const savedInformation = this.getSavedInboxInformation();
      if (savedInformation) {
        this.widgetBubblePositions = this.widgetBubblePositions.map(item => {
          if (item.id === savedInformation.position) {
            item.checked = true;
            this.widgetBubblePosition = item.id;
          }
          return item;
        });
        this.widgetBubbleTypes = this.widgetBubbleTypes.map(item => {
          if (item.id === savedInformation.type) {
            item.checked = true;
            this.widgetBubbleType = item.id;
          }
          return item;
        });
        this.widgetBubbleLauncherTitle =
          savedInformation.launcherTitle || 'Chat with us';
      }
      this.welcomeHeadingTranslations = parseJSON(
        this.currentInbox.welcome_title_translations
      ) || {
        en: channel.welcome_title || welcome_title || '',
      };

      if (Object.values(this.welcomeHeadingTranslations).every(v => !v)) {
        this.welcomeHeadingTranslations = {
          ...this.welcomeHeadingTranslations,
          en: channel.welcome_title || welcome_title || 'Welcome!',
        };
      }
      if (
        !this.welcomeHeadingActiveLocale ||
        !(this.welcomeHeadingActiveLocale in this.welcomeHeadingTranslations)
      ) {
        this.welcomeHeadingActiveLocale =
          preferredLocale in this.welcomeHeadingTranslations
            ? preferredLocale
            : Object.keys(this.welcomeHeadingTranslations)[0] || 'en';
      }
      if (
        this.welcomeHeadingTranslations[this.welcomeHeadingActiveLocale] ===
        undefined
      ) {
        this.$set(
          this.welcomeHeadingTranslations,
          this.welcomeHeadingActiveLocale,
          ''
        );
      }
      this.welcomeTaglineTranslations = parseJSON(
        this.currentInbox.welcome_tagline_translations
      ) || {
        en: channel.welcome_tagline || welcome_tagline || '',
      };
      if (Object.values(this.welcomeTaglineTranslations).every(v => !v)) {
        this.welcomeTaglineTranslations = {
          ...this.welcomeTaglineTranslations,
          en: channel.welcome_tagline || welcome_tagline || '',
        };
      }
      if (
        !this.welcomeTaglineActiveLocale ||
        !(this.welcomeTaglineActiveLocale in this.welcomeTaglineTranslations)
      ) {
        this.welcomeTaglineActiveLocale =
          preferredLocale in this.welcomeTaglineTranslations
            ? preferredLocale
            : Object.keys(this.welcomeTaglineTranslations)[0] || 'en';
      }
      if (
        this.welcomeTaglineTranslations[this.welcomeTaglineActiveLocale] ===
        undefined
      ) {
        this.$set(
          this.welcomeTaglineTranslations,
          this.welcomeTaglineActiveLocale,
          ''
        );
      }

      // Set up reply time message translations
      this.replyTimeMessageTranslations = parseJSON(
        this.currentInbox.reply_time_message_translations
      ) || { en: '' };

      if (
        !this.replyTimeMessageActiveLocale ||
        !(
          this.replyTimeMessageActiveLocale in this.replyTimeMessageTranslations
        )
      ) {
        this.replyTimeMessageActiveLocale =
          preferredLocale in this.replyTimeMessageTranslations
            ? preferredLocale
            : Object.keys(this.replyTimeMessageTranslations)[0] || 'en';
      }
      if (
        this.replyTimeMessageTranslations[this.replyTimeMessageActiveLocale] ===
        undefined
      ) {
        this.$set(
          this.replyTimeMessageTranslations,
          this.replyTimeMessageActiveLocale,
          ''
        );
      }
    },
    changeFieldLocale(field, locale) {
      this[`${field}ActiveLocale`] = locale;
      if (!this[`${field}Translations`][locale]) {
        this.$set(this[`${field}Translations`], locale, '');
      }
    },
    handleWidgetBubblePositionChange(item) {
      this.widgetBubblePosition = item.id;
    },
    handleWidgetBubbleTypeChange(item) {
      this.widgetBubbleType = item.id;
    },
    handleWidgetViewChange(item) {
      this.isWidgetPreview = item.id === 'preview';
    },
    handleImageUpload({ file, url }) {
      this.avatarFile = file;
      this.avatarUrl = url;
    },
    async handleAvatarDelete() {
      try {
        await this.$store.dispatch('inboxes/deleteInboxAvatar', this.inbox.id);
        this.avatarFile = null;
        this.avatarUrl = '';
        useAlert(
          this.$t(
            'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.AVATAR.DELETE.API.SUCCESS_MESSAGE'
          )
        );
      } catch (error) {
        useAlert(
          error.message
            ? error.message
            : this.$t(
                'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.AVATAR.DELETE.API.ERROR_MESSAGE'
              )
        );
      }
    },
    async updateWidget() {
      const bubbleSettings = {
        position: this.widgetBubblePosition,
        launcherTitle: this.widgetBubbleLauncherTitle,
        type: this.widgetBubbleType,
      };

      LocalStorage.set(this.storageKey, bubbleSettings);

      try {
        const payload = {
          id: this.inbox.id,
          name: this.websiteName,
          channel: {
            widget_color: this.color,
            welcome_title_translations: this.welcomeHeadingTranslations,
            welcome_tagline_translations: this.welcomeTaglineTranslations,
            reply_time_message_translations: this.replyTimeMessageTranslations,

            welcome_title: this.welcomeHeadingTranslations?.en || '',
            welcome_tagline: this.welcomeTaglineTranslations?.en || '',
            reply_time: this.replyTime,
          },
        };
        if (this.avatarFile) {
          payload.avatar = this.avatarFile;
        }
        await this.$store.dispatch('inboxes/updateInbox', payload);
        // Fetch latest inbox data and update UI fields
        const updatedInbox = await this.$store.dispatch(
          'inboxes/get',
          this.inbox.id
        );
        this.currentInbox = updatedInbox;
        this.setDefaults();
        useAlert(
          this.$t(
            'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.UPDATE.API.SUCCESS_MESSAGE'
          )
        );
      } catch (error) {
        useAlert(
          error.message ||
            this.$t(
              'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.UPDATE.API.ERROR_MESSAGE'
            )
        );
      }
    },
    getSavedInboxInformation() {
      return LocalStorage.get(this.storageKey);
    },
  },
};
</script>

<template>
  <div class="mx-8">
    <div class="flex p-2.5">
      <div class="w-100 lg:w-[40%]">
        <div class="min-h-full py-4 overflow-y-scroll px-px">
          <woot-avatar-uploader
            :label="$t('INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.AVATAR.LABEL')"
            :src="avatarUrl"
            delete-avatar
            @on-avatar-select="handleImageUpload"
            @on-avatar-delete="handleAvatarDelete"
          />
          <form @submit.prevent="updateWidget">
            <div class="flex items-center mb-2">
              <woot-input
                v-model="currentWelcomeHeading"
                :label="`${$t(
                  'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.WELCOME_HEADING.LABEL'
                )} (${welcomeHeadingActiveLocale})`"
                :placeholder="
                  $t(
                    'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.WELCOME_HEADING.PLACE_HOLDER'
                  )
                "
                class="flex-1"
              />
              <MultiselectDropdown
                :options="allLocaleOptions"
                :selected-item="{
                  id: welcomeHeadingActiveLocale,
                  name:
                    (localesMap && localesMap[welcomeHeadingActiveLocale]) ||
                    (welcomeHeadingActiveLocale
                      ? welcomeHeadingActiveLocale.toUpperCase()
                      : ''),
                }"
                multiselector-title="Locale"
                multiselector-placeholder="Select locale"
                :has-thumbnail="false"
                class="ml-2 w-48 mt-3"
                @select="opt => changeFieldLocale('welcomeHeading', opt.id)"
                @mousedown.prevent
              />
            </div>
            <div class="flex items-center mb-2">
              <woot-input
                v-model="currentWelcomeTagline"
                :label="`${$t(
                  'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.WELCOME_TAGLINE.LABEL'
                )} (${welcomeTaglineActiveLocale})`"
                :placeholder="
                  $t(
                    'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.WELCOME_TAGLINE.PLACE_HOLDER'
                  )
                "
                class="flex-1"
              />
              <MultiselectDropdown
                :options="allLocaleOptions"
                :selected-item="{
                  id: welcomeTaglineActiveLocale,
                  name:
                    (localesMap && localesMap[welcomeTaglineActiveLocale]) ||
                    (welcomeTaglineActiveLocale
                      ? welcomeTaglineActiveLocale.toUpperCase()
                      : ''),
                }"
                multiselector-title="Locale"
                multiselector-placeholder="Select locale"
                :has-thumbnail="false"
                class="ml-2 w-48 mt-3"
                @select="opt => changeFieldLocale('welcomeTagline', opt.id)"
                @mousedown.prevent
              />
            </div>

            <woot-input
              v-model="websiteName"
              :class="{ error: v$.websiteName.$error }"
              :label="`${$t(
                'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.WEBSITE_NAME.LABEL'
              )}`"
              :placeholder="
                $t(
                  'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.WEBSITE_NAME.PLACE_HOLDER'
                )
              "
              :error="websiteNameValidationErrorMsg"
              @blur="v$.websiteName.$touch"
            />
            <label>
              {{
                $t('INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.REPLY_TIME.LABEL')
              }}
              <select v-model="replyTime">
                <option
                  v-for="option in getReplyTimeOptions"
                  :key="option.key"
                  :value="option.value"
                >
                  {{ option.text }}
                </option>
              </select>
            </label>

            <!-- Custom reply time input when "custom" is selected -->
            <div v-if="replyTime === 'custom'" class="flex items-center mb-2">
              <woot-input
                v-model="currentReplyTimeMessage"
                :label="`${$t(
                  'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.REPLY_TIME.CUSTOM_MESSAGE_LABEL'
                )} (${replyTimeMessageActiveLocale})`"
                :placeholder="
                  $t(
                    'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.REPLY_TIME.CUSTOM_MESSAGE_PLACEHOLDER'
                  )
                "
                class="flex-1"
              />
              <MultiselectDropdown
                :options="allLocaleOptions"
                :selected-item="{
                  id: replyTimeMessageActiveLocale,
                  name:
                    (localesMap && localesMap[replyTimeMessageActiveLocale]) ||
                    (replyTimeMessageActiveLocale
                      ? replyTimeMessageActiveLocale.toUpperCase()
                      : ''),
                }"
                multiselector-title="Locale"
                multiselector-placeholder="Select locale"
                :has-thumbnail="false"
                class="ml-2 w-48 mt-3"
                @select="opt => changeFieldLocale('replyTimeMessage', opt.id)"
                @mousedown.prevent
              />
            </div>
            <label>
              {{
                $t(
                  'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.WIDGET_COLOR_LABEL'
                )
              }}
              <woot-color-picker v-model="color" />
            </label>
            <InputRadioGroup
              name="widget-bubble-position"
              :label="`${$t(
                'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.WIDGET_BUBBLE_POSITION_LABEL'
              )}`"
              :items="widgetBubblePositions"
              :action="handleWidgetBubblePositionChange"
            />
            <InputRadioGroup
              name="widget-bubble-type"
              :label="`${$t(
                'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.WIDGET_BUBBLE_TYPE_LABEL'
              )}`"
              :items="widgetBubbleTypes"
              :action="handleWidgetBubbleTypeChange"
            />
            <woot-input
              v-model="widgetBubbleLauncherTitle"
              :label="`${$t(
                'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.WIDGET_BUBBLE_LAUNCHER_TITLE.LABEL'
              )}`"
              :placeholder="
                $t(
                  'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.WIDGET_BUBBLE_LAUNCHER_TITLE.PLACE_HOLDER'
                )
              "
            />
            <NextButton
              type="submit"
              class="mt-4"
              :label="
                $t(
                  'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.UPDATE.BUTTON_TEXT'
                )
              "
              :is-loading="uiFlags.isUpdating"
              :disabled="v$.$invalid || uiFlags.isUpdating"
            />
          </form>
        </div>
      </div>
      <div class="w-100 lg:w-3/5">
        <InputRadioGroup
          name="widget-view-options"
          class="text-center"
          :items="getWidgetViewOptions"
          :action="handleWidgetViewChange"
        />
        <div
          v-if="isWidgetPreview"
          class="flex flex-col items-center justify-end min-h-[40.625rem] mx-5 mb-5 p-2.5 bg-slate-50 dark:bg-slate-900/50 rounded-lg"
        >
          <Widget
            :welcome-heading="welcomeHeadingTranslations"
            :welcome-tagline="welcomeTaglineTranslations"
            :website-name="websiteName"
            :logo="avatarUrl"
            is-online
            :reply-time="replyTime"
            :reply-time-message-translations="replyTimeMessageTranslations"
            :color="color"
            :widget-bubble-position="widgetBubblePosition"
            :widget-bubble-launcher-title="widgetBubbleLauncherTitle"
            :widget-bubble-type="widgetBubbleType"
          />
        </div>
        <div
          v-else
          class="mx-5 p-2.5 bg-n-slate-3 rounded-lg dark:bg-n-solid-3"
        >
          <woot-code :script="widgetScript" />
        </div>
      </div>
    </div>
  </div>
</template>
