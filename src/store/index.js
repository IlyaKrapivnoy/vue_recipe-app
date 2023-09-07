import { createStore } from "vuex";

export default createStore({
  state: {
    recipes: JSON.parse(localStorage.getItem("recipes")) || [],
  },
  mutations: {
    ADD_RECIPE(state, recipe) {
      state.recipes.push(recipe);
      localStorage.setItem("recipes", JSON.stringify(state.recipes));
    },
    DELETE_RECIPE(state, slug) {
      state.recipes = state.recipes.filter((recipe) => recipe.slug !== slug);
      localStorage.setItem("recipes", JSON.stringify(state.recipes));
    },
  },
});
