import { model, models, Schema, Types } from "mongoose";

export interface MoodInterface {
    _id: Types.ObjectId;
    username: string;
    entries: [
        {
            date: number; // yyyymmdd format (for uniqueness)
            timestamp: Date; // ISO format
            moodScore: number;
            description: string;
        },
    ];
}

const MoodSchema = new Schema<MoodInterface>(
    {
        username: {
            type: String,
            required: true,
            index: true,
            unique: true,
        },
        entries: {
            type: [
                {
                    date: {
                        type: Number,
                        required: true,
                        index: true,
                        unique: true,
                    },
                    timestamp: {
                        type: Date,
                        required: true,
                    },
                    moodScore: { type: Number, required: true, min: 0, max: 4 },
                    description: { type: String, default: "" },
                },
            ],
            default: [],
        },
    },
    {
        timestamps: true,
    },
);

const Mood = models.Mood || model("Mood", MoodSchema);

export { Mood, MoodSchema };
