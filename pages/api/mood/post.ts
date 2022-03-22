import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Mood, MoodInterface } from "../../../database/models/mood";
import connectDB from "../utils/mongoose";

const post = async (
    req: NextApiRequest,
    res: NextApiResponse<MoodInterface | ErrorResponse>,
): Promise<void> => {
    const { username, day, moodScore } = req.body;

    const mood = new Mood({
        username: username,
        moods: [
            {
                day: day === "" ? new Date().toISOString() : day,
                moodScore: moodScore,
            },
        ],
    });

    await mood
        .save()
        .then((mood) => res.status(200).json(mood))
        .catch((err) => res.status(400).send(err));
};

export default connectDB(post);
