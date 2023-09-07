<template>
  <main class="recipe">
    <div class="recipe-header">
      <h1>{{ recipe.title }}</h1>
      <router-link to="/" class="btn-back">&lt; Back</router-link>
    </div>
    <p class="desc">{{ recipe.description }}</p>
    <hr />
    <div class="ingredients">
      <h3>Ingredients</h3>
      <ul>
        <li v-for="(ingredient, i) in recipe.ingredients" :key="i">
          {{ ingredient }}
        </li>
      </ul>
    </div>
    <div class="method">
      <h3>Method</h3>
      <ol>
        <li v-for="(step, i) in recipe.method" :key="i">
          <span v-html="cleanText(step)"></span>
        </li>
      </ol>
    </div>
  </main>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

const recipe = computed(() => {
  return store.state.recipes.find(
    (recipe) => recipe.slug === route.params.slug
  );
});

const cleanText = (text) => {
  return text.replace(/\n/g, "<br />");
};
</script>

<style scoped>
.recipe {
  padding: 1rem;
  max-width: 768px;
  margin: 0 auto;
}

.recipe-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 60px;
}

.btn-back {
  border: 2px solid #2aeb74;
  border-radius: 4px;
  padding: 10px 13px;
}

.desc {
  font-size: 1.125rem;
  line-height: 1.4;
  margin-bottom: 1rem;
}

hr {
  margin-bottom: 1rem;
}

h3 {
  margin-bottom: 1rem;
}

.ingredients {
  padding: 1rem;
  background-color: #081c33;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
}

.ingredients ul li {
  list-style-position: inside;
  line-height: 1.4;
  margin-bottom: 1rem;
}

.method ol li {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  list-style-position: inside;
  border-bottom: 1px solid #eee;
}
</style>
