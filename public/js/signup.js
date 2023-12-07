// signup.js

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
  
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent the default form submission
  
      // Get the values from the form inputs
      const nickname = document.getElementById('nickname-signup').value.trim();
      const password = document.getElementById('password-signup').value.trim();
      const errorMessage = document.getElementById('error-message');
  
      // Simple client-side validation
      if (!nickname || !password) {
        errorMessage.textContent = 'Nickname and password are required!';
        errorMessage.style.display = 'block';
        return;
      }
  
      // Construct the request payload
      const userData = { nickname, password };
  
      try {
        // Send the request to your API endpoint
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        const data = await response.json();
  
        // Handle the response
        if (data.success) {
          // If signup was successful, redirect to the login page
          window.location.href = '/login';
        } else {
          // If there was an error, display it
          errorMessage.textContent = data.message;
          errorMessage.style.display = 'block';
        }
      } catch (error) {
        // If there was an error sending the request
        console.error('Error during signup:', error);
        errorMessage.textContent = 'An error occurred during signup.';
        errorMessage.style.display = 'block';
      }
    });
  });
  