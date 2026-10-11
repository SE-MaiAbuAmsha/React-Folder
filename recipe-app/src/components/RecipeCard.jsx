function RecipeCard({ id, name, ingredients, isFavourite, onToggleFavourite }) {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      {isFavourite && <p>⭐ Favourite</p>}
      <button onClick={() => onToggleFavourite(id)}>
        {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
      </button>
    </div>
  );
}

export default RecipeCard;
