<script setup>
import CategoryCard from './CategoryCard.vue';
const categories = [
  {
    id: 'getting-started',
    title: '🚀 Getting started',
    description:
      'Learn how to use Chatwoot effectively and make the most of its features to enhance customer support and engagement.',
    articlesCount: '5',
  },
  {
    id: 'marketing',
    title: '📈 Marketing',
    description: '',
    articlesCount: '4',
  },
];
</script>

<!-- eslint-disable vue/no-bare-strings-in-template -->
<!-- eslint-disable vue/no-undef-components -->
<template>
  <Story
    title="Components/HelpCenter/CategoryCard"
    :layout="{ type: 'grid', width: '800px' }"
  >
    <Variant title="Category Card">
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="px-20 py-4 bg-white dark:bg-slate-900"
      >
        <CategoryCard
          :title="category.title"
          :description="category.description"
          :articles-count="category.articlesCount"
        />
      </div>
    </Variant>
  </Story>
</template>
