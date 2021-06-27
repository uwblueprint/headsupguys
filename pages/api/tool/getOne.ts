import { Tool } from "database/models/tool";
import { NextApiRequest, NextApiResponse } from "next";

const getOne = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    const { id } = req.query;

    await Tool.findById(id)
        .exec()
        .then((tool) => res.status(200).json(tool))
        .catch((err) => res.status(500).send(err));
};

export default getOne;
