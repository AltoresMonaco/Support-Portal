<script>
import { frontendURL } from 'dashboard/helper/URLHelper';
import { mapGetters } from 'vuex';
import globalConfigMixin from 'shared/mixins/globalConfigMixin';

export default {
   mixins: [globalConfigMixin],
  props: {
    source: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    accountId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters({ globalConfig: 'globalConfig/get' }),
    dashboardPath() {
      return frontendURL(`accounts/${this.accountId}/dashboard`);
    },
  },
};
</script>

<template>
  <div class="w-8 h-8">
    <router-link :to="dashboardPath" replace>
      <img :src="source" :alt="name" />

      <img
        v-if="globalConfig.logoDark"
        :src="globalConfig.logoDark"
        :alt="globalConfig.installationName"
        class="hidden w-auto h-8 mx-auto dark:block"
      />
    </router-link>
  </div>
</template>
