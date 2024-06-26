function showAlertWithCountdown(message, seconds) {
    return new Promise((resolve) => {
        const modal = document.getElementById('loading-modal');
        const loadingMessage = document.getElementById('loading-message');
        modal.style.display = 'flex';
        
        let countdown = seconds;
        const intervalId = setInterval(() => {
            if (countdown > 0) {
                loadingMessage.textContent = `${message} (${countdown}s)`;
                countdown--;
            } else {
                clearInterval(intervalId);
                modal.style.display = 'none';
                resolve();
            }
        }, 1000);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/request/pending', {
            headers: {
                'Authorization': token
            }
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des demandes en attente');
        }

        const requests = await response.json();
        const requestList = document.getElementById('request-list');

        requests.forEach(request => {
            const li = document.createElement('li');
            const user = request.userId;

            li.textContent = `Utilisateur: ${user.username}, Email: ${user.email}, Description: ${request.description}`;
            
            const approveButton = document.createElement('button');
            approveButton.textContent = 'Approuver';
            approveButton.addEventListener('click', async () => {
                try {
                    await showAlertWithCountdown('Opération en cours, veuillez patienter', 3);

                    const approveResponse = await fetch(`/request/${request._id}/approve`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': token
                        }
                    });

                    if (!approveResponse.ok) {
                        throw new Error('Erreur lors de l\'approbation de la demande');
                    }

                    alert('Demande approuvée avec succès');
                    window.location.reload();

                } catch (error) {
                    console.error('Erreur:', error.message);
                    alert('Erreur lors de l\'approbation de la demande. Veuillez réessayer.');
                }
            });

            const rejectButton = document.createElement('button');
            rejectButton.textContent = 'Rejeter';
            rejectButton.addEventListener('click', async () => {
                try {
                    await showAlertWithCountdown('Opération en cours, veuillez patienter', 3);

                    const rejectResponse = await fetch(`/request/${request._id}/reject`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': token
                        }
                    });

                    if (!rejectResponse.ok) {
                        throw new Error('Erreur lors du rejet de la demande');
                    }

                    alert('Demande rejetée avec succès');
                    window.location.reload();

                } catch (error) {
                    console.error('Erreur:', error.message);
                    alert('Erreur lors du rejet de la demande. Veuillez réessayer.');
                }
            });

            li.appendChild(approveButton);
            li.appendChild(rejectButton);
            requestList.appendChild(li);
        });

    } catch (error) {
        console.error('Erreur:', error.message);
        alert('Erreur lors de la récupération des demandes en attente. Veuillez réessayer.');
    }
});
