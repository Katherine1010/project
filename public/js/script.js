let addIngredientsBtn = document.getElementById('addIngredientsBtn');
let ingredientList = document.querySelector('.ingredientList');
let ingredeintDiv = document.querySelectorAll('.ingredeintDiv')[0];

addIngredientsBtn.addEventListener('click', function(){
  let newIngredients = ingredeintDiv.cloneNode(true);
  let input = newIngredients.getElementsByTagName('input')[0];
  input.value = '';
  ingredientList.appendChild(newIngredients);
});

function deleteRecipe(recipeId) {
  fetch(`/recipe/${recipeId}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok - ${response.statusText}`);
      }
      console.log('Recipe deleted successfully');
      window.location.reload();
    })
    .catch(error => {
      console.error('Error deleting recipe:', error.message);
    });
}

function toggleUpdateForm() {
  var recipeDetails = document.getElementById("recipeDetails");
  var updateForm = document.getElementById("updateRecipeForm");

  if (recipeDetails && updateForm) {
    recipeDetails.style.display = recipeDetails.style.display === "none" ? "block" : "none";
    updateForm.style.display = updateForm.style.display === "none" ? "block" : "none";
  }
}

// Update the function definition to accept recipeId
async function updateRecipe(event, recipeId) {
  event.preventDefault(); // Prevent the default form submission

  // Get the form data
  const formData = new FormData(document.getElementById('updateRecipeForm'));

  try {
    const response = await fetch(`/recipe/${recipeId}`, {
      method: 'PATCH',
      body: formData,
    });

    if (response.ok) {
      // Handle success, e.g., redirect to the updated recipe page
      window.location.href = `/recipe/${recipeId}`;
    } else {
      // Handle error, e.g., display an error message
      console.error('Error updating recipe:', response.statusText);
    }
  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
}

