import React, { useState } from 'react';

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState('');

  const handleAddRecipe = () => {
    if (newRecipe.trim()) {
      setRecipes([...recipes, newRecipe]);
      setNewRecipe('');
    }
  };

  return (
    <div>
      <h1>Dashboard - Manage Your Recipes</h1>
      <input type="text" placeholder="New Recipe" value={newRecipe} onChange={(e) => setNewRecipe(e.target.value)} />
      <button onClick={handleAddRecipe}>Add Recipe</button>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>{recipe}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;