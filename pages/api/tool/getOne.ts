import { Tool } from "database/models/tool";
import { NextApiRequest, NextApiResponse } from "next";

const getOne = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    const { id } = req.query;

    await Tool.findById(id)
        .then((tool) => {
            if (tool) {
                res.status(200).json(tool);
            } else {
                res.status(404).send({
                    error: "Tool with given id was not found",
                });
            }
        })
        .catch((err) => res.status(500).send(err));
};

export default getOne;
