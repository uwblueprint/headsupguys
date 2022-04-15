import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Mood, MoodInterface } from "../../../database/models/mood";
import connectDB from "../utils/mongoose";
import { isSameDay } from "date-fns";

const post = async (
    req: NextApiRequest,
    res: NextApiResponse<MoodInterface | ErrorResponse>,
): Promise<void> => {
    const { username, moodScore } = req.body;
    let { timestamp } = req.body;

    if (!timestamp || timestamp === "") {
        timestamp = new Date().toISOString();
    }

    let mood = await Mood.findOne({ username: username });

    if (mood) {
        const entry = mood.entries.find((entry) => {
            const timestampDate = new Date(timestamp);
            const entryDate = new Date(entry.timestamp);
            return isSameDay(timestampDate, entryDate);
        });
        if (entry) {
            entry.moodScore = moodScore;
        } else {
            mood.entries.push({
                timestamp: timestamp,
                moodScore: moodScore,
            });
        }
    } else {
        mood = new Mood({
            username: username,
            entries: [
                {
                    timestamp: timestamp,
                    moodScore: moodScore,
                },
            ],
        });
    }

    await mood
        .save()
        .then((mood) => res.status(200).json(mood))
        .catch((err) => {
            console.log(mood, err);
            res.status(400).send(err);
            return;
        });
};

export default connectDB(post);
