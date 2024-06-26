document.addEventListener('DOMContentLoaded', async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/users/', {
            headers: {
                'Authorization': token
            }
        });
        
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des utilisateurs');
        }
        
        const users = await response.json();
        const userList = document.getElementById('user-list');

        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `Nom: ${user.username}, Email: ${user.email} , Role: ${user.role}`;
            userList.appendChild(li);
        });

    } catch (error) {
        console.error('Erreur:', error.message);
        alert('Erreur lors de la récupération des utilisateurs. Veuillez réessayer.');
    }
});
