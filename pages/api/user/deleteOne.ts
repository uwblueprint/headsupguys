import { Role, User } from "database/models/user";
import { NextApiRequest, NextApiResponse } from "next";
import getAll from "./getAll";

const deleteOne = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    const { id } = req.query;

    const allUsers = await User.find({});
    const superAdmins = allUsers.filter((u) => u.role == Role.SUPER_ADMIN);

    if (superAdmins.length == 1 && superAdmins[0]._id == id) {
        res.status(405).json({ error: "Cannot delete the only Super Admin" });
    }

    await User.findByIdAndDelete(id)
        .then(() => getAll(res)) // return all users
        .catch((err) => res.status(500).send(err));
};

export default deleteOne;
