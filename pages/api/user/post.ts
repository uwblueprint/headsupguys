import { User } from "database/models/user";
import { NextApiRequest, NextApiResponse } from "next";
import getAll from "./getAll";

const post = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    await User.create(req.body)
        .then(() => getAll(res)) // return all users
        .catch((err) => res.status(400).send(err));
};

export default post;
