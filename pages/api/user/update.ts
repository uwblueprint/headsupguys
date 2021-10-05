import { Role, User } from "database/models/user";
import { NextApiRequest, NextApiResponse } from "next";
import getAll from "./getAll";

const update = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    const { id } = req.query;
    const { role } = req.body;

    const superAdmins = await User.find({ role: Role.SUPER_ADMIN });

    // if id belongs to the only SUPER ADMIN and role is being updated
    if (
        superAdmins.length == 1 &&
        superAdmins[0]._id == id &&
        role &&
        role != Role.SUPER_ADMIN
    ) {
        res.status(405).json({
            error: "Cannot change the role of the only Super Admin",
        });
    }

    await User.findByIdAndUpdate(id, req.body)
        .then(() => getAll(res)) // return all users
        .catch((err) => res.status(500).send(err));
};

export default update;
