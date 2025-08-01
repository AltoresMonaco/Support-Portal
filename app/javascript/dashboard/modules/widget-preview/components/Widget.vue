<script>
import InputRadioGroup from 'dashboard/routes/dashboard/settings/inbox/components/InputRadioGroup.vue';
import globalConfigMixin from 'shared/mixins/globalConfigMixin';
import { mapGetters } from 'vuex';
import WidgetBody from './WidgetBody.vue';
import WidgetFooter from './WidgetFooter.vue';
import WidgetHead from './WidgetHead.vue';

export default {
  name: 'Widget',
  components: {
    WidgetHead,
    WidgetBody,
    WidgetFooter,
    InputRadioGroup,
  },
  mixins: [globalConfigMixin],
  props: {
    welcomeHeading: {
      type: [String, Object], // Can be plain string or translations object { en: 'Hello', fr: 'Bonjour' }
      default: '',
    },
    welcomeTagline: {
      type: [String, Object],
      default: '',
    },
    websiteName: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      default: '',
    },
    isOnline: {
      type: Boolean,
      default: true,
    },
    replyTime: {
      type: String,
      default: '',
    },
    replyTimeMessageTranslations: {
      type: Object,
      default: () => ({}),
    },
    color: {
      type: String,
      default: '',
    },
    widgetBubblePosition: {
      type: String,
      default: '',
    },
    widgetBubbleLauncherTitle: {
      type: String,
      default: '',
    },
    widgetBubbleType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      widgetScreens: [
        {
          id: 'default',
          title: this.$t('INBOX_MGMT.WIDGET_BUILDER.WIDGET_SCREEN.DEFAULT'),
          checked: true,
        },
        {
          id: 'chat',
          title: this.$t('INBOX_MGMT.WIDGET_BUILDER.WIDGET_SCREEN.CHAT'),
          checked: false,
        },
      ],
      isDefaultScreen: true,
      isWidgetVisible: true,
    };
  },
  computed: {
    ...mapGetters({ globalConfig: 'globalConfig/get' }),
    resolvedWelcomeHeading() {
      if (
        typeof this.welcomeHeading === 'object' &&
        this.welcomeHeading !== null
      ) {
        const locale = this.$i18n?.locale || 'en';
        return (
          this.welcomeHeading[locale] ||
          this.welcomeHeading.en ||
          Object.values(this.welcomeHeading)[0] ||
          ''
        );
      }
      return this.welcomeHeading;
    },
    resolvedWelcomeTagline() {
      if (
        typeof this.welcomeTagline === 'object' &&
        this.welcomeTagline !== null
      ) {
        const locale = this.$i18n?.locale || 'en';
        return (
          this.welcomeTagline[locale] ||
          this.welcomeTagline.en ||
          Object.values(this.welcomeTagline)[0] ||
          ''
        );
      }
      return this.welcomeTagline;
    },
    getWidgetConfig() {
      return {
        welcomeHeading: this.resolvedWelcomeHeading,
        welcomeTagline: this.resolvedWelcomeTagline,
        websiteName: this.websiteName,
        logo: this.logo,
        isDefaultScreen: this.isDefaultScreen,
        isOnline: this.isOnline,
        replyTime: this.replyTimeText,
        color: this.color,
      };
    },
    replyTimeText() {
      switch (this.replyTime) {
        case 'in_a_few_minutes':
          return this.$t(
            'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.REPLY_TIME.IN_A_FEW_MINUTES'
          );
        case 'in_a_day':
          return this.$t(
            'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.REPLY_TIME.IN_A_DAY'
          );
        case 'custom': {
          // Get custom message for current locale or fallback to English or first available
          const currentLocale = this.$i18n.locale || 'en';
          return (
            this.replyTimeMessageTranslations[currentLocale] ||
            this.replyTimeMessageTranslations.en ||
            Object.values(this.replyTimeMessageTranslations)[0] ||
            this.$t(
              'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.REPLY_TIME.IN_A_FEW_HOURS'
            )
          );
        }

        default:
          return this.$t(
            'INBOX_MGMT.WIDGET_BUILDER.WIDGET_OPTIONS.REPLY_TIME.IN_A_FEW_HOURS'
          );
      }
    },
    getBubblePositionStyle() {
      return {
        justifyContent: this.widgetBubblePosition === 'left' ? 'start' : 'end',
      };
    },
    isBubbleExpanded() {
      return (
        !this.isWidgetVisible && this.widgetBubbleType === 'expanded_bubble'
      );
    },
    getWidgetBubbleLauncherTitle() {
      return this.isWidgetVisible || this.widgetBubbleType === 'standard'
        ? ' '
        : this.widgetBubbleLauncherTitle;
    },
  },
  methods: {
    handleScreenChange(item) {
      this.isDefaultScreen = item.id === 'default';
    },
    toggleWidget() {
      this.isWidgetVisible = !this.isWidgetVisible;
      this.isDefaultScreen = true;
    },
  },
};
</script>

<template>
  <div>
    <div v-if="isWidgetVisible" class="flex flex-col items-center">
      <InputRadioGroup
        name="widget-screen"
        :items="widgetScreens"
        :action="handleScreenChange"
      />
    </div>
    <div
      v-if="isWidgetVisible"
      class="widget-wrapper flex flex-col justify-between rounded-lg shadow-md bg-slate-25 dark:bg-slate-800 h-[31.25rem] w-80"
    >
      <WidgetHead :config="getWidgetConfig" />
      <div>
        <WidgetBody
          v-if="!getWidgetConfig.isDefaultScreen"
          :config="getWidgetConfig"
        />
        <WidgetFooter :config="getWidgetConfig" />
        <div class="py-2.5 flex justify-center">
          <a
            class="items-center gap-0.5 text-slate-500 dark:text-slate-400 cursor-pointer flex filter grayscale opacity-90 hover:grayscale-0 hover:opacity-100 text-xxs"
          >
            <img
              class="max-w-2.5 max-h-2.5"
              :src="globalConfig.logoThumbnail"
            />
            <span>
              {{
                useInstallationName(
                  $t('INBOX_MGMT.WIDGET_BUILDER.BRANDING_TEXT'),
                  'Altores'
                )
              }}
            </span>
          </a>
        </div>
      </div>
    </div>
    <div class="flex mt-4 w-[320px]" :style="getBubblePositionStyle">
      <button
        class="relative flex items-center justify-center rounded-full cursor-pointer"
        :style="{ background: color }"
        :class="
          isBubbleExpanded
            ? 'w-auto font-medium text-base text-white dark:text-white h-12 px-4'
            : 'w-16 h-16'
        "
        @click="toggleWidget"
      >
        <img
          v-if="!isWidgetVisible"
          src="~dashboard/assets/images/bubble-logo.svg"
          alt=""
          draggable="false"
          class="w-6 h-6 mx-auto"
        />
        <div v-if="isBubbleExpanded" class="ltr:pl-2.5 rtl:pr-2.5">
          {{ getWidgetBubbleLauncherTitle }}
        </div>
        <div v-if="isWidgetVisible" class="relative">
          <div class="absolute w-0.5 h-8 rotate-45 -translate-y-1/2 bg-white" />
          <div
            class="absolute w-0.5 h-8 -rotate-45 -translate-y-1/2 bg-white"
          />
        </div>
      </button>
    </div>
  </div>
</template>
