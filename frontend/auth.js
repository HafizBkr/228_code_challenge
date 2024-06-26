document.addEventListener('DOMContentLoaded', (event) => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '/index.html';
    } else {
        const decodedToken = parseJwt(token);
        if (window.location.pathname.includes('/admin/') && decodedToken.role !== 'admin') {
            window.location.href = '/index.html';
        }
        if (window.location.pathname.includes('/traiteur/') && (decodedToken.role !== 'admin' && decodedToken.role !== 'traiteur')) {
            window.location.href = '/index.html';
        }
        if (window.location.pathname.includes('/utilisateur/') && decodedToken.role !== 'utilisateur') {
            window.location.href = '/index.html';
        }
    }

    displayUsername();
    setupLogout();
});
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
function displayUsername() {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = parseJwt(token);
        const usernameDisplay = document.getElementById('username-display');
        if (usernameDisplay && decodedToken.username) {
            usernameDisplay.textContent = `Bienvenue, ${decodedToken.username}`;
        }
    } else {
        window.location.href = '/index.html'; 
    }
}
function setupLogout() {
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = '/index.html';
        });
    }
}
