const Report = require('../models/Report.model');
const debug = require('debug')('app:report-controller');
const httpError = require('http-errors');

const controller = {};

controller.save = async (req, res, next) => {
    try {
        const { reportCause, post } = req.body;
        const { user } = req;

        const report = new Report({
            reportCause,
            post,
            user: user._id
        });

        const reportSaved = await report.save();

        if (!reportSaved) throw httpError(409, 'Error saving report');

        return res.status(201).json({ message : 'Report saved' });
    } catch (error) {
        next(error);
    }
};

controller.findAll = async (req, res, next) => {
    try {
        const reports = await Report.find()
            .populate('post', 'title topics category publication_year publication_cycle');

        return res.status(200).json({ reports });
    } catch (error) {
        next(error);
    }
}

module.exports = controller;  