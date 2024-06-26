document.addEventListener('DOMContentLoaded', () => {
    const requestForm = document.getElementById('request-form');

    requestForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const description = document.getElementById('description').value;
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('/request/create', {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ description })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la création de la demande');
            }

            alert('Demande créée avec succès');
            window.location.href = '/utilisateur/create_request.html'; // Redirection après création

        } catch (error) {
            console.error('Erreur:', error.message);
            alert('Erreur lors de la création de la demande. Veuillez réessayer.');
        }
    });
});
