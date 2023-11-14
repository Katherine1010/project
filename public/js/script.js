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