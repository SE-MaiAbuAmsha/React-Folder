import "./App.css";
import { useState } from "react";
import RecipeCard from "./components/RecipeCard.jsx";

const initialRecipes = [
  {
    id: 1,
    name: "Maqloba",
    ingredients: ["Rice", "Chicken", "Vegetables"],
    isFavourite: false,
  },
  {
    id: 2,
    name: "Maqloba",
    ingredients: ["Rice", "Chicken", "Vegetables"],
    isFavourite: true,
  },
];

function App() {
  //state for recipes
  const [recipes, setRecipes] = useState(initialRecipes);
  //state for show Favourites Only
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);
  const displayedRecipes = showFavouritesOnly
    ? recipes.filter((recipe) => recipe.isFavourite)
    : recipes;

  //state for add new recipe
  const [newName, setNewName] = useState("");
  const [newIngredients, setNewIngredients] = useState("");

  //track id to detrmine the Favourite recipe
  const toggleFavourite = (id) => {
    setRecipes(
      //maps on recipes to see the id matches to set isFavourite
      recipes.map((recipe) =>
        //condition to set or remove isFavourite
        // هل رقم هذي الوصفة نفس الرقم اللي بدنا نغيره؟
        recipe.id === id
          ? //لو الشرط صح انشئ اوبجكت جديد
            //  ...recipe = انسخ كل خصائص الوصفة (id, name, ingredients).
            // وبعدين أضف/عدل خاصية. عكس قيمتها الحالية
            { ...recipe, isFavourite: !recipe.isFavourite }
          : //: ارجعلي الوصفة كما هي، بدون أي تغيير.
            recipe,
      ),
    );
  };

  const handleAddRecipe = () => {
    // 1. تحقق إن الاسم مش فاضي
    if (newName.trim() === "") {
      return;
    }

    // 2. أنشئ وصفة جديدة
    const newRecipe = {
      id: Date.now(),
      name: newName,
      ingredients: newIngredients.split(",").map((i) => i.trim()),
      isFavourite: false,
    };

    // 3. أضفها للstate
    setRecipes([...recipes, newRecipe]);

    // 4. صفّر الـ inputs
    setNewName("");
    setNewIngredients("");
  };
  return (
    <div>
      <h1>Recipe Book</h1>

      <button onClick={() => setShowFavouritesOnly(!showFavouritesOnly)}>
        {showFavouritesOnly ? "Show All Recipes" : "Show Favourites Only"}
      </button>

      <div>
        <input
          type="text"
          placeholder="Recipe name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ingredients (comma separated)"
          value={newIngredients}
          onChange={(e) => setNewIngredients(e.target.value)}
        />
        <button onClick={handleAddRecipe}>+ Add New Recipe</button>
      </div>
      {displayedRecipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          id={recipe.id}
          name={recipe.name}
          ingredients={recipe.ingredients}
          isFavourite={recipe.isFavourite}
          onToggleFavourite={toggleFavourite}
        />
      ))}
    </div>
  );
}

export default App;
