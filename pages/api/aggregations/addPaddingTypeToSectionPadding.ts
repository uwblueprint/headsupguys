import { Slide } from "database/models/slide";
import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../utils/mongoose";

const addPaddingTypeToSectionPadding = async (
    req: NextApiRequest,
    res: NextApiResponse<any>,
): Promise<void> => {
    console.log("hello");
    const result = await Slide.aggregate([
        {
            $addFields: {
                sections: {
                    $map: {
                        input: "$sections",
                        as: "section",
                        in: {
                            $cond: [
                                {
                                    $ne: ["$$section.padding.type", "px"],
                                },
                                {
                                    $mergeObjects: [
                                        "$$section.padding",
                                        {
                                            type: "%",
                                        },
                                    ],
                                },
                                "$$section",
                            ],
                        },
                    },
                },
            },
        },
    ]);
    res.status(200).json(result);
};
export default connectDB(addPaddingTypeToSectionPadding);
