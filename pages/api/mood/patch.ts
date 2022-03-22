import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Mood, MoodInterface } from "../../../database/models/mood";
import connectDB from "../utils/mongoose";

const patch = async (
    req: NextApiRequest,
    res: NextApiResponse<MoodInterface | ErrorResponse>,
): Promise<void> => {
    const username = req.query.username as string;
    const { day, moodScore } = req.body;

    const mood = await Mood.findOne({ username: username });

    if (!mood)
        return res.status(404).send({
            error: "The mood with the given username was not found.",
        });

    mood.moods.push({
        day: day === "" ? new Date().toISOString() : day,
        moodScore: moodScore,
    });
    mood.save();

    res.status(200).json(mood);
};

export default connectDB(patch);
