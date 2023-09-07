<template>
  <main class="home">
    <h1>My Recipes</h1>
    <button @click="togglePopup">Add new Recipe</button>

    <div class="recipes">
      <div v-if="store.state.recipes.length === 0" class="no-recipes">
        There is no data for now
        <div class="loading-dots">
          <div class="dot dot-1"></div>
          <div class="dot dot-2"></div>
          <div class="dot dot-3"></div>
        </div>
      </div>

      <div
        class="card"
        v-for="recipe in store.state.recipes"
        :key="recipe.slug"
      >
        <div class="card-title">
          <h2>{{ recipe.title }}</h2>
          <button @click="deleteRecipe(recipe.slug)" class="remove-btn">
            x
          </button>
        </div>
        <p>{{ recipe.description }}</p>
        <router-link :to="`/recipe/${recipe.slug}`">
          <button>View Recipe</button>
        </router-link>
      </div>
    </div>

    <div class="add-recipe-popup" v-if="popupOpen">
      <div class="popup-content">
        <h2>Add new recipe</h2>

        <form @submit.prevent="addNewRecipe">
          <div class="group">
            <label>Title</label>
            <input type="text" v-model="newRecipe.title" />
          </div>

          <div class="group">
            <label>Description</label>
            <textarea v-model="newRecipe.description"></textarea>
          </div>

          <div class="group">
            <label>Ingredients</label>
            <div
              class="ingredient"
              v-for="i in newRecipe.ingredientRows"
              :key="i"
            >
              <input type="text" v-model="newRecipe.ingredients[i - 1]" />
            </div>
            <button type="button" @click="addNewIngredient">
              Add Ingredient
            </button>
          </div>

          <div class="group">
            <label>Method</label>
            <div class="method" v-for="i in newRecipe.methodRows" :key="i">
              <textarea v-model="newRecipe.method[i - 1]"></textarea>
            </div>
            <button type="button" @click="addNewStep">Add step</button>
          </div>

          <div class="button-container">
            <button type="submit">Add Recipe</button>
            <button type="button" class="red-button" @click="togglePopup">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const popupOpen = ref(false);

const newRecipe = ref({
  title: "",
  description: "",
  ingredients: [],
  method: [],
  ingredientRows: 1,
  methodRows: 1,
});

const togglePopup = () => {
  popupOpen.value = !popupOpen.value;
};

const addNewIngredient = () => {
  newRecipe.value.ingredientRows++;
};

const addNewStep = () => {
  newRecipe.value.methodRows++;
};

const addNewRecipe = () => {
  newRecipe.value.slug = newRecipe.value.title
    .toLowerCase()
    .replace(/\s/g, "-");

  const titleIsEmpty = !newRecipe.value.slug;
  const descriptionIsEmpty = !newRecipe.value.description;
  const ingredientsAreEmpty = newRecipe.value.ingredients.length === 0;
  const methodIsEmpty = newRecipe.value.method.length === 0;

  if (
    titleIsEmpty ||
    descriptionIsEmpty ||
    ingredientsAreEmpty ||
    methodIsEmpty
  ) {
    alert("Please fill in all required fields");
    return;
  }

  store.commit("ADD_RECIPE", { ...newRecipe.value });

  newRecipe.value = {
    title: "",
    description: "",
    ingredients: [],
    method: [],
    ingredientRows: 1,
    methodRows: 1,
  };

  togglePopup();
};

const deleteRecipe = (slug) => {
  store.commit("DELETE_RECIPE", slug);
};
</script>

<style scoped>
.home {
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 48px;
  margin-bottom: 32px;
}

.remove-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
}

.recipes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.recipes .card {
  padding: 16px;
  border-radius: 5px;
  margin: 16px;
  background-color: #081c33;
}

.recipes .card .card-title {
  display: flex;
  justify-content: space-between;
  max-height: 60px;
  padding-bottom: 10px;
  border-bottom: 1px solid white;
  overflow: hidden;
}

.recipes .card .card-title h2 {
  font-size: 32px;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recipes .card p {
  font-size: 18px;
  line-height: 1.4;
  margin-bottom: 16px;
  padding: 16px 0;
}

.add-recipe-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-recipe-popup .popup-content {
  background-color: #081c33;
  padding: 32px;
  border-radius: 16px;
  width: 100%;
  max-width: 768px;
  max-height: 80vh;
  overflow-y: auto;
}

.popup-content h2 {
  font-size: 32px;
  margin-bottom: 16px;
}

.popup-content .group {
  margin-bottom: 16px;
}

.popup-content .group label {
  display: block;
  margin-bottom: 8px;
}

.popup-content .group input,
.popup-content .group textarea {
  display: block;
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 16px;
}

.popup-content .group textarea {
  height: 100px;
  resize: none;
}

.popup-content button[type="submit"] {
  margin-right: 16px;
}

.button-container {
  display: flex;
  justify-content: center;
}

.button-container button {
  margin: 0 10px;
  width: 150px;
}

.red-button {
  background-color: #bb3636;
  color: white;
}

.no-recipes {
  display: flex;
  margin: 40px 0;
  text-align: center;
  text-transform: uppercase;
  color: #2aeb74;
  letter-spacing: 3px;
}

.loading-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  margin-left: 4px;
}

.dot {
  width: 5px;
  height: 5px;
  background-color: #333;
  border-radius: 50%;
  margin: 0 3px;
  animation: jump 0.6s infinite alternate;
}

.dot-1 {
  animation-delay: 0.1s;
}

.dot-2 {
  animation-delay: 0.2s;
}

.dot-3 {
  animation-delay: 0.3s;
}

@keyframes jump {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}
</style>
