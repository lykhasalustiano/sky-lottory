const users = JSON.parse(localStorage.getItem('users')) || [];

        document.addEventListener('DOMContentLoaded', function () {
            const signupButton = document.querySelector('.signup-btn');

            signupButton.addEventListener('click', function (event) {
                event.preventDefault();

                const username = document.getElementById('username').value.trim();
                const email = document.getElementById('email').value.trim();
                const password = document.getElementById('password').value.trim();
                const confirmPassword = document.getElementById('confirm-password').value.trim();

                if (!username || !email || !password || !confirmPassword) {
                    alert('Please fill in all fields.');
                    return;
                }

                if (password !== confirmPassword) {
                    alert('Passwords do not match.');
                    return;
                }

                const existingUser = users.find(user => user.username === username);
                if (existingUser) {
                    alert('Username already exists. Please choose another one.');
                    return;
                }

                users.push({ username, email, password });
                localStorage.setItem('users', JSON.stringify(users));

                alert('Account created successfully! Redirecting to game page...');
                window.location.href = '../html/home.html';
            });

            const toggleVisibility = (inputId, buttonId) => {
                const input = document.getElementById(inputId);
                const button = document.getElementById(buttonId);

                button.addEventListener('click', () => {
                    const isPassword = input.type === 'password';
                    input.type = isPassword ? 'text' : 'password';
                    button.textContent = isPassword ? 'Hide' : 'Show';
                });
            };

            toggleVisibility('password', 'toggle-password');
            toggleVisibility('confirm-password', 'toggle-confirm-password');
        });