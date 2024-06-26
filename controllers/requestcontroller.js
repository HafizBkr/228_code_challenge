const Request = require('../models/Request');
const User = require('../models/User');
const generatePDF = require('../utils/pdfGenerator');
const sendEmail = require('../utils/sendEmail');
const { errorCodes, generateErrorResponse } = require('../utils/errorCodes');

exports.createRequest = async (req, res) => {
    try {
        const { description } = req.body;
        const request = new Request({ userId: req.user._id, description });
        await request.save();
        res.status(201).send({ message: 'Demande créée avec succès.' });
    } catch (error) {
        res.status(500).send(generateErrorResponse(errorCodes.CREATE_REQUEST_ERROR, error.message));
    }
};

exports.approveRequest = async (req, res) => {
    try {
        const requestId = req.params.id;
        const request = await Request.findById(requestId).populate('userId');
        if (!request) {
            return res.status(404).send(generateErrorResponse(errorCodes.REQUEST_NOT_FOUND));
        }

        request.status = 'approved';
        await request.save();

        // Génération du PDF
        const pdfPath = generatePDF(request.userId, request, 'approved');

        // Envoi de l'email
        await sendEmail(
            request.userId.email,
            'Demande Approuvée',
            'Votre demande a été approuvée. Veuillez trouver en pièce jointe le document PDF.',
            pdfPath // Chemin du fichier PDF
        );

        res.status(200).send({ message: 'Demande approuvée avec succès.' });
    } catch (error) {
        res.status(500).send(generateErrorResponse(errorCodes.APPROVE_REQUEST_ERROR, error.message));
    }
};

exports.rejectRequest = async (req, res) => {
    try {
        const requestId = req.params.id;
        const request = await Request.findById(requestId).populate('userId');
        if (!request) {
            return res.status(404).send(generateErrorResponse(errorCodes.REQUEST_NOT_FOUND));
        }

        request.status = 'rejected';
        await request.save();

        // Génération du PDF
        const pdfPath = generatePDF(request.userId, request, 'rejected');

        // Envoi de l'email
        await sendEmail(
            request.userId.email,
            'Demande Rejetée',
            'Votre demande a été rejetée. Veuillez trouver en pièce jointe le document PDF.',
            pdfPath // Chemin du fichier PDF
        );

        res.status(200).send({ message: 'Demande rejetée avec succès.' });
    } catch (error) {
        res.status(500).send(generateErrorResponse(errorCodes.REJECT_REQUEST_ERROR, error.message));
    }
};

exports.getPendingRequests = async (req, res) => {
    try {
        const requests = await Request.find({ status: 'pending' }).populate('userId', 'username  email');
        res.status(200).send(requests);
    } catch (error) {
        res.status(500).send(generateErrorResponse(errorCodes.FETCH_REQUESTS_ERROR, error.message));
    }
};
