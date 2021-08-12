import { User } from "database/models/user";
import { NextApiRequest, NextApiResponse } from "next";

const getOne = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    const { id } = req.query;

    await User.findById(id)
        .then((user) => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).send({
                    error: "User with given id was not found",
                });
            }
        })
        .catch((err) => res.status(500).send(err));
};

export default getOne;
