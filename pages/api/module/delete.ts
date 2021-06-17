import { NextApiRequest, NextApiResponse } from "next";

const del = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    res.status(200).json({ OK: "ok" });
};

export { del };
