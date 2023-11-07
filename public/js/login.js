
// Login function (async- pending request)
const login = async (e) => {
  // Prevent form submission default
  e.preventDefault();

  // Collect values from the login form
  var nickname = document.querySelector('#nickname-login').value.trim();
  var password = document.querySelector('#password-login').value.trim();

  if (nickname && password) {
    // POST request
    var response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ nickname, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the chatrooms page
      document.location.replace('/chat');
    } else {
      console.log(response.statusText);
      alert("Login failed. Please try again");
    }    
  }
};

document.querySelector('.login-form').addEventListener('submit', login);
