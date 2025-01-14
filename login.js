document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Create a feedback div if it doesn't exist
    let feedbackDiv = document.getElementById('feedback');
    if (!feedbackDiv) {
        feedbackDiv = document.createElement('div');
        feedbackDiv.id = 'feedback';
        document.getElementById('loginForm').insertAdjacentElement('beforebegin', feedbackDiv);
    }

    try {
        // Update this URL to your deployed backend URL
        const response = await fetch('https://your-backend-url.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('username', username);
            localStorage.setItem('token', data.token);
            
            // Show success message
            feedbackDiv.className = 'alert alert-success';
            feedbackDiv.textContent = 'Login successful! Redirecting...';
            
            // Redirect after a short delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            // Show error message
            feedbackDiv.className = 'alert alert-danger';
            feedbackDiv.textContent = data.message || 'Login failed. Please check your credentials.';
        }
    } catch (error) {
        console.error('Error:', error);
        // Show network error message
        feedbackDiv.className = 'alert alert-danger';
        feedbackDiv.textContent = 'Network error. Please check your connection.';
    }
});
