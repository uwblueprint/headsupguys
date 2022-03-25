import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Mood, MoodInterface } from "../../../database/models/mood";
import connectDB from "../utils/mongoose";

const post = async (
    req: NextApiRequest,
    res: NextApiResponse<MoodInterface | ErrorResponse>,
): Promise<void> => {
    const { username, moodScore } = req.body;
    let { date, timestamp } = req.body;

    if (!date || date === "") {
        date = new Date().toISOString().substring(0, 10).replace(/-/g, "");
        date = parseInt(date);
    }
    if (!timestamp || timestamp === "") {
        timestamp = new Date().toISOString();
    }

    let mood = await Mood.findOne({ username: username });

    if (mood) {
        const entry = mood.entries.find((entry) => entry.date === date);
        if (entry) {
            entry.moodScore = moodScore;
        } else {
            mood.entries.push({
                date: date,
                timestamp: timestamp,
                moodScore: moodScore,
            });
        }
    } else {
        mood = new Mood({
            username: username,
            entries: [
                {
                    date: date,
                    timestamp: timestamp,
                    moodScore: moodScore,
                },
            ],
        });
    }

    await mood
        .save()
        .then((mood) => res.status(200).json(mood))
        .catch((err) => res.status(400).send(err));
};

export default connectDB(post);
