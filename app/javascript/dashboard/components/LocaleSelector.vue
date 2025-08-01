<script setup>
import MultiselectDropdown from 'shared/components/ui/MultiselectDropdown.vue';
import { computed } from 'vue';

const props = defineProps({
  locales: {
    type: Array,
    required: true,
  },
  activeLocale: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['addLocale', 'removeLocale', 'changeLocale']);

const localeOptions = computed(() =>
  props.locales.map(locale => ({ id: locale, name: locale.toUpperCase() }))
);

const selectedLocale = computed(
  () =>
    localeOptions.value.find(l => l.id === props.activeLocale) ||
    localeOptions.value[0]
);

function handleSelect(option) {
  emit('changeLocale', option.id);
}

function handleAddLocale() {
  // Emit event for parent to handle locale addition (no prompt here)
  emit('addLocale');
}

function handleRemoveLocale(locale) {
  // Emit event for parent to handle confirmation (no confirm here)
  if (locale !== 'en') {
    emit('removeLocale', locale);
  }
}
</script>

<template>
  <div class="flex items-center gap-2 mb-4">
    <MultiselectDropdown
      :options="localeOptions"
      :selected-item="selectedLocale"
      :multiselector-title="
        $t('INBOX_MGMT.WIDGET_BUILDER.LOCALE_SELECTOR.LABEL')
      "
      :multiselector-placeholder="
        $t('INBOX_MGMT.WIDGET_BUILDER.LOCALE_SELECTOR.PLACEHOLDER')
      "
      :has-thumbnail="false"
      @select="handleSelect"
    />
    <button
      type="button"
      class="btn btn-xs btn-outline"
      :aria-label="$t('INBOX_MGMT.WIDGET_BUILDER.LOCALE_SELECTOR.ADD')"
      @click="handleAddLocale"
    >
      {{ $t('INBOX_MGMT.WIDGET_BUILDER.LOCALE_SELECTOR.ADD_BUTTON') }}
    </button>
    <template v-for="locale in locales" :key="locale">
      <button
        v-if="locale !== 'en'"
        type="button"
        class="btn btn-xs btn-danger"
        :aria-label="
          $t('INBOX_MGMT.WIDGET_BUILDER.LOCALE_SELECTOR.REMOVE', {
            locale: locale.toUpperCase(),
          })
        "
        @click="handleRemoveLocale(locale)"
      >
        {{ locale.toUpperCase() }}
        {{ $t('INBOX_MGMT.WIDGET_BUILDER.LOCALE_SELECTOR.REMOVE_BUTTON') }}
      </button>
    </template>
  </div>
</template>

<style scoped>
/* Replaced @apply with standard CSS for compatibility */
.btn {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  border-width: 1px;
  font-size: 0.75rem;
}
.btn-outline {
  border-color: #cbd5e1; /* n-slate-6 */
  color: #0f172a; /* n-slate-12 */
  background: transparent;
  transition: background 0.2s;
}
.btn-outline:hover {
  background: #f1f5f9; /* n-slate-2 */
}
.btn-danger {
  border-color: #f87171; /* red-400 */
  color: #dc2626; /* red-600 */
  background: transparent;
  margin-left: 0.25rem;
  transition: background 0.2s;
}
.btn-danger:hover {
  background: #fef2f2; /* red-50 */
}
</style>
