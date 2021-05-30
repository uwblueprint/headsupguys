import mongoose from "mongoose";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const connectDB =
    (handler: NextApiHandler) =>
    async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
        if (mongoose.connections[0].readyState) {
            // Use current db connection
            return handler(req, res);
        }

        // Use new db connection
        await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useNewUrlParser: true,
        });
        return handler(req, res);
    };

export default connectDB;
