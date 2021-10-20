import { NextApiRequest, NextApiResponse } from "next";
import { SelfCheckGroup } from "database/models/selfCheckGroup";

const delSelfCheckByID = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    // Find self check by id
    const { id } = req.query;
    try {
        await SelfCheckGroup.findByIdAndDelete(id);
        res.status(204).send({});
    } catch (err) {
        res.status(500).send(err);
    }
};

export { delSelfCheckByID };
