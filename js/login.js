document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const messageElement = document.getElementById('loginMessage');

    messageElement.textContent = '';
    messageElement.className = 'message';

    if (!username || !password) {
        messageElement.textContent = 'Please fill in all fields.';
        messageElement.classList.add('error');
        return;
    }

    if (username === 'admin' && password === 'password123') {
        messageElement.textContent = 'Login successful! Redirecting...';
        messageElement.classList.add('success');
        setTimeout(() => {
            window.location.href = '../html/home.html';
        }, 1500);
    } else {
        messageElement.textContent = 'Invalid username or password.';
        messageElement.classList.add('error');
    }
});