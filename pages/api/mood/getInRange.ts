import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Mood, MoodInterface } from "../../../database/models/mood";
import connectDB from "../utils/mongoose";
import { isBefore, isSameDay } from "date-fns";

const getInRange = async (
    req: NextApiRequest,
    res: NextApiResponse<MoodInterface | ErrorResponse>,
): Promise<void> => {
    const username = req.query.username as string;
    const startTimestamp = req.query.startTimestamp as string; // ISO format
    const endTimestamp = req.query.endTimestamp as string; // ISO format

    const mood = await Mood.findOne({
        username: username,
    });

    if (!mood) {
        return res.status(404).send({
            error: "The mood with the given username was not found.",
        });
    }

    const entriesInRange = mood.entries.filter((entry) => {
        const startDate = new Date(startTimestamp);
        const endDate = new Date(endTimestamp);
        const timestamp = new Date(entry.timestamp);
        return (
            (isBefore(startDate, timestamp) ||
                isSameDay(startDate, timestamp)) &&
            (isBefore(timestamp, endDate) || isSameDay(timestamp, endDate))
        );
    });

    res.status(200).json(entriesInRange);
};

export default connectDB(getInRange);
