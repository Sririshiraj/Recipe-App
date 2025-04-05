import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/usergetUserId";  // Correct path to your hook
import { useNavigate } from "react-router-dom";
import './Createrecipe.css';
  

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",  // To store the image URL
    cookingTime: 0,
    userOwner: userID,
  });

  const [showModal, setShowModal] = useState(false);  
  const [modalMessage, setModalMessage] = useState("");  
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a FormData instance to handle file upload
      const formData = new FormData();
      formData.append("image", file);

      // You can add the file to the backend API that handles file uploads
      axios.post("https://localhost:5000/upload", formData)
        .then(response => {
          // Assuming the backend returns the image URL
          setRecipe({ ...recipe, imageUrl: response.data.imageUrl });
        })
        .catch(error => {
          console.error("Error uploading image:", error);
        });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        "https://localhost:5000/recipes",
        { ...recipe }
      );
      setModalMessage("Recipe Created Successfully!");
      setShowModal(true);  
    } catch (error) {
      console.error(error);
      setModalMessage("Failed to create recipe. Please try again.");
      setShowModal(true);  
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);  
    navigate("/");  
  };

  return (
    <div className="abc">
      <div className="create-recipe">
        <h2>Create Recipe</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
          />
          
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={recipe.description}
            onChange={handleChange}
          ></textarea>
          
          <label htmlFor="ingredients">Ingredients</label>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
            />
          ))}
          <button type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>
          
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
          ></textarea>

          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          
          <label htmlFor="cookingTime">Cooking Time (minutes)</label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
          />
          <button type="submit">Create Recipe</button>
        </form>
      </div>

      {/* {showModal && (
        <Modal
          message={modalMessage}
          onClose={handleCloseModal}
        />
      )} */}
    </div>
  );
};
