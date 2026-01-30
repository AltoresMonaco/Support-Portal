<script>
import FluentIcon from 'shared/components/FluentIcon/Index.vue';

export default {
  name: 'MessageReplyButton',
  components: { FluentIcon },
};
</script>

<template>
  <button
    class="mb-1 rounded-full dark:text-slate-500 dark:bg-slate-900 text-slate-600 bg-slate-100 hover:text-slate-800 min-w-[24px] min-h-[24px] flex items-center justify-center"
    style="padding: 6px;"
    aria-label="Reply to message"
    lang="en"
  >
    <FluentIcon icon="arrow-reply" size="12" class="flex-shrink-0" aria-hidden="true" />
  </button>
</template>
