import { model, models, Schema, Types } from "mongoose";

export interface MoodInterface {
    _id: Types.ObjectId;
    username: string;
    entries: [
        {
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
                    timestamp: {
                        type: Date,
                        required: true,
                        index: true,
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

MoodSchema.pre("save", async function (next) {
    const dates = new Set();
    this.entries.forEach((entry) => {
        const date = new Date(entry.timestamp);
        const day =
            date.getDate().toString() +
            date.getMonth().toString() +
            date.getFullYear().toString();
        dates.add(day);
    });
    if (dates.size < this.entries.length) {
        next(new Error("Duplicate dates in entries."));
    } else {
        next();
    }
});

const Mood = models.Mood || model("Mood", MoodSchema);

export { Mood, MoodSchema };
