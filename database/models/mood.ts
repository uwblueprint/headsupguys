import { model, models, Schema, Types } from "mongoose";

export interface MoodInterface {
    _id: Types.ObjectId;
    username: string;
    moods: [
        {
            day: Date;
            mood: number;
            description: string;
        },
    ];
}

const MoodSchema = new Schema<MoodInterface>(
    {
        username: {
            type: String,
            required: true,
        },
        moods: {
            type: [
                {
                    day: {
                        type: Date,
                        required: true,
                        index: true,
                        unique: true,
                    },
                    mood: { type: Number, required: true, min: 0, max: 4 },
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
