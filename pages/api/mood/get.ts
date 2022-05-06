import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Mood, MoodInterface } from "../../../database/models/mood";
import connectDB from "../utils/mongoose";
import { isSameDay } from "date-fns";

const getInRange = async (
    req: NextApiRequest,
    res: NextApiResponse<MoodInterface | ErrorResponse>,
): Promise<void> => {
    const username = req.query.username as string;
    const timestamp = req.query.timestamp as string; // ISO format

    const mood = await Mood.findOne({
        username: username,
    });

    if (!mood) {
        return res.status(404).send({
            error: "The mood with the given username was not found.",
        });
    }

    const entry = mood.entries.filter((entry) =>
        isSameDay(new Date(timestamp), new Date(entry.timestamp)),
    );

    res.status(200).json(entry);
};

export default connectDB(getInRange);
