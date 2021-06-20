import { NextApiRequest, NextApiResponse } from "next";

const delSelfCheckByID = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    res.status(200).json({ OK: "ok" });
};

export { delSelfCheckByID };
