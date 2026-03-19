import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const eventsFilePath = path.join(__dirname, "../data/events.json");
const eventsData = JSON.parse(fs.readFileSync(eventsFilePath, "utf-8"));

const submittedReports = [];

export const submitReport = (req, res) => {
    const { eventId, reason } = req.body;

    if (!eventId || !reason) {
    return res.status(400).json({
        success: false,
        message: "Event ID and reason are required."
    });
    }

    const newReport = {
    id: submittedReports.length + 1,
    eventId,
    reason,
    createdAt: new Date().toISOString()
    };

    submittedReports.push(newReport);

    return res.status(201).json({
    success: true,
    message: "Report submitted successfully.",
    report: newReport
    });
};

export const searchEvents = (req, res) => {
    const query = req.query.q?.trim().toLowerCase() || "";

    if (!query) {
    return res.json({
        success: true,
        results: [],
        message: "Please enter a search term."
    });
    }

    const results = eventsData.filter((event) =>
    event.title.toLowerCase().includes(query) ||
    event.category.toLowerCase().includes(query) ||
    event.location.toLowerCase().includes(query) ||
    event.description.toLowerCase().includes(query)
    );

    return res.json({
    success: true,
    count: results.length,
    results
    });
};