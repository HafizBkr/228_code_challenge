const bcrypt = require('bcryptjs');

async function hashAndComparePassword() {
    try {
        const plainPassword = 'motdepass'; // Mot de passe en clair
        
        // Hasher le mot de passe en clair de manière asynchrone
        const hashedPassword = await bcrypt.hash(plainPassword, 10);
        console.log(`Mot de passe hashé : ${hashedPassword}`);
        
        // Comparer le mot de passe en clair avec le hash généré
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        if (isMatch) {
            console.log('Le mot de passe correspond.');
        } else {
            console.log('Le mot de passe ne correspond pas.');
        }
    } catch (error) {
        console.error(`Erreur : ${error.message}`);
    }
}

// Appel de la fonction
hashAndComparePassword();
