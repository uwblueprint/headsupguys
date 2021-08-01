import { Tool } from "database/models/tool";
import { NextApiRequest, NextApiResponse } from "next";

const deleteOne = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    const { id } = req.query;

    await Tool.findByIdAndDelete(id)
        .then((tool) => res.status(200).json(tool))
        .catch((err) => res.status(500).send(err));
};

export default deleteOne;
