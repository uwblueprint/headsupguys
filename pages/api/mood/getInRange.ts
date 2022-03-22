import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "types/ErrorResponse";
import { Mood, MoodInterface } from "../../../database/models/mood";
import connectDB from "../utils/mongoose";

const getInRange = async (
    req: NextApiRequest,
    res: NextApiResponse<MoodInterface | ErrorResponse>,
): Promise<void> => {
    const username = req.query.username as string;
    const startDate = req.query.startDate; // Date object
    const endDate = req.query.endDate; // Date object

    const userMood = await Mood.findOne({
        username: username,
    });

    if (!userMood)
        return res.status(404).send({
            error: "The mood with the given username was not found.",
        });

    const moodsInRange = userMood.moods.filter(
        (mood) => mood.day >= startDate && mood.day <= endDate,
    );

    res.status(200).json(moodsInRange);
};

export default connectDB(getInRange);
