import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Mood, MoodInterface } from "../../../database/models/mood";
import connectDB from "../utils/mongoose";

const getInRange = async (
    req: NextApiRequest,
    res: NextApiResponse<MoodInterface | ErrorResponse>,
): Promise<void> => {
    const username = req.query.username as string;
    let startTimestamp = req.query.startTimestamp as string; // ISO format (time will be truncated)
    let endTimestamp = req.query.endTimestamp as string; // ISO format (time will be truncated)

    startTimestamp = startTimestamp.substring(0, 10);
    endTimestamp = endTimestamp.substring(0, 10);

    const mood = await Mood.findOne({
        username: username,
    });

    if (!mood) {
        return res.status(404).send({
            error: "The mood with the given username was not found.",
        });
    }

    const entriesInRange = mood.entries.filter((entry) => {
        const timestamp = entry.timestamp.toISOString().substring(0, 10);
        return (
            startTimestamp.localeCompare(timestamp) <= 0 &&
            endTimestamp.localeCompare(timestamp) >= 0
        );
    });

    res.status(200).json(entriesInRange);
};

export default connectDB(getInRange);
