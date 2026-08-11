// Select the form element
const form = document.querySelector('form');

// Listen for the submit event
form.addEventListener('submit', function(event) {
  // Prevent the default form submission (which reloads the page)
  event.preventDefault();

  // Use FormData to easily extract values based on the 'name' attributes
  const formData = new FormData(form);
  
  const userName = formData.get('name');
  const userPassword = formData.get('password');

  // Log the values to the console (you can replace this with an API call)
  console.log('Name submitted:', userName);
  console.log('Password submitted:', userPassword);

  // Optional: Clear the form after submission
  // form.reset();
});