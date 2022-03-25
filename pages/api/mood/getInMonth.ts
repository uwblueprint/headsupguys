import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Mood, MoodInterface } from "../../../database/models/mood";
import connectDB from "../utils/mongoose";

const getInMonth = async (
    req: NextApiRequest,
    res: NextApiResponse<MoodInterface | ErrorResponse>,
): Promise<void> => {
    const username = req.query.username as string;
    const month = req.query.month as string; // numeric month as string, e.g. "1"
    const year = req.query.year as string; // numeric year as string, e.g. "2022"

    const mood = await Mood.findOne({
        username: username,
    });

    if (!mood) {
        res.status(404).send({
            error: "The mood with the given username was not found.",
        });
    }

    const entriesInMonth = mood.entries.filter((entry) => {
        const entryMonth = new Date(entry.timestamp).getMonth() + 1;
        const entryYear = new Date(entry.timestamp).getFullYear();
        return entryMonth.toString() === month && entryYear.toString() === year;
    });

    res.status(200).json(entriesInMonth);
};

export default connectDB(getInMonth);
