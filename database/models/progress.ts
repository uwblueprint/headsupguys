import { model, models, Schema, Types } from "mongoose";

export interface ProgressInterface {
    _id: Types.ObjectId;
    username: string;
    module: string;
    completion?: number;
    input?: Schema.Types.Mixed;
}

const ProgressSchema = new Schema<ProgressInterface>(
    {
        username: {
            type: String,
            required: true,
        },
        module: {
            type: [{ type: Schema.Types.ObjectId, ref: "Module" }],
            required: true,
        },
        completion: { type: Number, default: 0 },
        input: { type: Schema.Types.Mixed },
    },
    {
        timestamps: true,
    },
);

ProgressSchema.index({ username: 1, module: 1 }, { unique: true });

const Progress = models.Progress || model("Progress", ProgressSchema);

export { Progress, ProgressSchema };
