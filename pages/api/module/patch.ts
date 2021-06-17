import { NextApiRequest, NextApiResponse } from "next";
import { Module, ModuleSchema } from "../models/module";

export default async (req: NextApiRequestWithFoo, res: NextApiResponse) => {
    // Collect name, email and role
    const { id } = req.query;
    const { title, tool, slides, editing } = req.body;

    // If email exists
    if (id && title && title && tool && slides && editing) {
        // If the email is invalid

        // module update
        const module = await prisma.module.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title,
                tool,
                slides,
                editing,
            },
        });

        // If module updated send it back
        if (module) {
            return res.json(module);
        }
        // Else, return server error
        else {
            return res.status(500).end();
        }
    }
    // Return unauthorized for all other requests
    return res.status(401).send("Unauthorized");
};
