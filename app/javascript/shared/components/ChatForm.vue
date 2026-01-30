<script>
import { mapGetters } from 'vuex';
import { getContrastingTextColor } from '@chatwoot/utils';

export default {
  props: {
    buttonLabel: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
    submittedValues: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['submit'],
  data() {
    return {
      formValues: {},
      hasSubmitted: false,
    };
  },
  computed: {
    ...mapGetters({
      widgetColor: 'appConfig/getWidgetColor',
    }),
    textColor() {
      return getContrastingTextColor(this.widgetColor);
    },
    isFormValid() {
      return this.items.reduce((acc, { name }) => {
        return !!this.formValues[name] && acc;
      }, true);
    },
  },
  mounted() {
    if (this.submittedValues.length) {
      this.updateFormValues();
    } else {
      this.setFormDefaults();
    }
  },
  methods: {
    onSubmitClick() {
      this.hasSubmitted = true;
    },
    onSubmit() {
      if (!this.isFormValid) {
        return;
      }
      this.$emit('submit', this.formValues);
    },
    buildFormObject(formObjectArray) {
      return formObjectArray.reduce((acc, obj) => {
        return {
          ...acc,
          [obj.name]: obj.value || obj.default,
        };
      }, {});
    },
    updateFormValues() {
      this.formValues = this.buildFormObject(this.submittedValues);
    },
    setFormDefaults() {
      this.formValues = this.buildFormObject(this.items);
    },
  },
};
</script>

<template>
  <div
    class="form chat-bubble agent w-full p-4 bg-n-background dark:bg-n-solid-3"
  >
    <form @submit.prevent="onSubmit">
      <div
        v-for="item in items"
        :key="item.key"
        class="pb-2 w-full"
        :class="{
          'has-submitted': hasSubmitted,
        }"
      >
        <label class="text-n-slate-12">
          {{ item.label }}<span v-if="item.required" class="text-n-ruby-11" aria-hidden="true"> *</span>
        </label>
        <input
          v-if="item.type === 'email'"
          v-model="formValues[item.name]"
          :type="item.type"
          :pattern="item.regex"
          :title="item.title"
          :required="item.required && 'required'"
          :name="item.name"
          :placeholder="item.placeholder"
          :disabled="!!submittedValues.length"
          :aria-invalid="hasSubmitted && !formValues[item.name] ? 'true' : 'false'"
          :aria-required="item.required ? 'true' : 'false'"
        />
        <input
          v-else-if="item.type === 'text'"
          v-model="formValues[item.name]"
          :required="item.required && 'required'"
          :pattern="item.pattern"
          :title="item.title"
          :type="item.type"
          :name="item.name"
          :placeholder="item.placeholder"
          :disabled="!!submittedValues.length"
          :aria-invalid="hasSubmitted && !formValues[item.name] ? 'true' : 'false'"
        />
        <textarea
          v-else-if="item.type === 'text_area'"
          v-model="formValues[item.name]"
          :required="item.required && 'required'"
          :title="item.title"
          :name="item.name"
          :placeholder="item.placeholder"
          :disabled="!!submittedValues.length"
          :aria-invalid="hasSubmitted && !formValues[item.name] ? 'true' : 'false'"
        />
        <select
          v-else-if="item.type === 'select'"
          v-model="formValues[item.name]"
          :required="item.required && 'required'"
          :aria-invalid="hasSubmitted && !formValues[item.name] ? 'true' : 'false'"
          :aria-required="item.required ? 'true' : 'false'"
        >
          <option
            v-for="option in item.options"
            :key="option.key"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
        <span class="error-message">
          {{ item.pattern_error || $t('CHAT_FORM.INVALID.FIELD') }}
        </span>
      </div>
      <button
        v-if="!submittedValues.length"
        class="button block"
        type="submit"
        :style="{
          background: widgetColor,
          borderColor: widgetColor,
          color: textColor,
        }"
        @click="onSubmitClick"
      >
        {{ buttonLabel || $t('COMPONENTS.FORM_BUBBLE.SUBMIT') }}
      </button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.form {
  label {
    @apply block font-medium py-1 px-0 capitalize;
  }

  .button {
    @apply text-sm rounded-lg;
  }

  .error-message {
    @apply text-n-ruby-11 mt-1 hidden;
  }

  input,
  textarea,
  select {
    @apply dark:bg-n-alpha-black1;
  }

  .has-submitted {
    input:invalid,
    textarea:invalid {
      @apply outline-n-ruby-10 dark:outline-n-ruby-10 hover:outline-n-ruby-11 dark:hover:outline-n-ruby-11 transition-all duration-200 ease-in-out;
    }
    input:invalid + .error-message,
    textarea:invalid + .error-message {
      display: block;
    }
  }
}
</style>
