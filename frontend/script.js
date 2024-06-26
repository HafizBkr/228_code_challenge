const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const usernameOrEmail = document.getElementById('usernameOrEmail').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usernameOrEmail, password })
        });
        if (!response.ok) {
            const errorData = await response.json();
            handleLoginError(errorData.error.message);
            throw new Error(errorData.error.message);
        }
        const { token } = await response.json();
        localStorage.setItem('token', token);
        const decodedToken = parseJwt(token); 
        switch (decodedToken.role) {
            case 'admin':
                window.location.href = '/admin/create-user.html';
                break;
            case 'traiteur':
                window.location.href = '/traiteur/pending-requests.html';
                break;
            case 'utilisateur':
                window.location.href = '/utilisateur/create_request.html';
                break;
            default:
                window.location.href = '/utilisateur/create_request.html';
                break;
        }
    } catch (error) {
        console.error('Erreur lors de la connexion:', error.message);
        alert('Erreur lors de la connexion. Veuillez réessayer en mettant les bon identifiant.');
    }
});
function handleLoginError(message) {
    const usernameOrEmailInput = document.getElementById('usernameOrEmail');
    const passwordInput = document.getElementById('password');
    
    if (message.includes('username or email') || message.includes('invalid username or email')) {
        usernameOrEmailInput.classList.add('invalid');
    }
    if (message.includes('password') || message.includes('invalid password')) {
        passwordInput.classList.add('invalid');
    }
    setTimeout(() => {
        usernameOrEmailInput.classList.remove('invalid');
        passwordInput.classList.remove('invalid');
    }, 300);
}
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', function () {
        if (this.classList.contains('invalid')) {
            this.classList.remove('invalid');
        }
    });
});
