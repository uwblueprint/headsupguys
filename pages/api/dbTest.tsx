import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "./utils/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { db } = await connectToDatabase();
    const movies = await db
        .collection("restaurants")
        .find({})
        .limit(20)
        .toArray();
    res.json(movies);
};
