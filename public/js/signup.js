const signup = async (e) => {
  e.preventDefault();

  const nickname = document.querySelector('#nickname-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (nickname && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ nickname, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the chatrooms page
      document.location.replace('/chat');
    } else {
      // Get the error message from the server response
      const data = await response.json();
      const errorMessage = data.message;

      // Show the error message in the UI
      const errorElement = document.querySelector('#error-message');
      errorElement.textContent = errorMessage;
      errorElement.style.display = 'block';
    }
  }
};

document.querySelector('#signup-form').addEventListener('submit', signup);
