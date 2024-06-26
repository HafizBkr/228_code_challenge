document.addEventListener('DOMContentLoaded', () => {
    const createUserForm = document.getElementById('create-user-form');

    createUserForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                alert('Vous devez être connecté pour créer un utilisateur.');
                return;
            }

            const response = await fetch('/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ username, email, password, role })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const responseData = await response.json();
            alert('Utilisateur créé avec succès');
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur:', error.message);
            alert('Erreur lors de la création de l\'utilisateur. Veuillez réessayer.');
        }
    });
});
