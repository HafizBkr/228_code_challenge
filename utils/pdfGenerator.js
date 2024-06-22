const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generatePDF = (user, request, status) => {
    // Vérifiez si le répertoire existe, sinon créez-le
    const documentsDir = path.join(__dirname, '../documents');
    if (!fs.existsSync(documentsDir)) {
        fs.mkdirSync(documentsDir, { recursive: true });
    }

    // Nom du fichier PDF
    const fileName = `Request_${request._id}.pdf`;
    const filePath = path.join(documentsDir, fileName);
    
    // Création du flux d'écriture pour le fichier
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));

    // Contenu du PDF
    doc.fontSize(16).text(`Nom de l'utilisateur: ${user.username}`, { align: 'left' });
    doc.fontSize(12).text(`Description de la demande: ${request.description}`, { align: 'left' });
    doc.fontSize(12).text(`Statut de la demande: ${status}`, { align: 'left' });

    doc.end();
    
    return filePath;
};

module.exports = generatePDF;
