import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Mood, MoodInterface } from "../../../database/models/mood";
import connectDB from "../utils/mongoose";

const getInMonth = async (
    req: NextApiRequest,
    res: NextApiResponse<MoodInterface | ErrorResponse>,
): Promise<void> => {
    const username = req.query.username as string;
    const month = req.query.month; // numeric month
    const year = req.query.year; // numeric year

    const userMood = await Mood.findOne({
        username: username,
    });

    if (!userMood)
        return res.status(404).send({
            error: "The mood with the given username was not found.",
        });

    const moodsInMonth = userMood.moods.filter(
        (mood) => mood.day.getMonth() === month && mood.day.getYear() === year,
    );

    res.status(200).json(moodsInMonth);
};

export default connectDB(getInMonth);
