import { User } from "database/models/user";
import { NextApiRequest, NextApiResponse } from "next";

const getAll = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    await User.find({})
        .then((tools) => res.status(200).json(tools))
        .catch((err) => res.status(500).send(err));
};

export default getAll;
