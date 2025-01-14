document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Create or get feedback element
    let feedbackDiv = document.getElementById('feedback');
    if (!feedbackDiv) {
        feedbackDiv = document.createElement('div');
        feedbackDiv.id = 'feedback';
        document.getElementById('registerForm').insertAdjacentElement('beforebegin', feedbackDiv);
    }

    // Disable form while submitting
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = 'Registering...';

    try {
        // Replace with your deployed backend URL
        const response = await fetch('https://task-manger-v2.onrender.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Show success message
            feedbackDiv.className = 'alert alert-success';
            feedbackDiv.textContent = 'Registration successful! Redirecting to login...';
            
            // Redirect after a short delay
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            // Show error from server
            feedbackDiv.className = 'alert alert-danger';
            feedbackDiv.textContent = data.message || 'Registration failed. Please try again.';
            submitButton.disabled = false;
            submitButton.innerHTML = 'Register';
        }
    } catch (error) {
        console.error('Error:', error);
        // Show network error
        feedbackDiv.className = 'alert alert-danger';
        feedbackDiv.textContent = 'Network error. Please check your connection and try again.';
        submitButton.disabled = false;
        submitButton.innerHTML = 'Register';
    }
});
