import { models, model, Schema, Types } from "mongoose";
import { SectionInterface, SectionSchema } from "./section";
// enum Buttons {
//     TEXT = "text",
//     VIDEO = "video",
//     AUDIO = "audio",
// }

export interface SlideInterface {
    _id: Types.ObjectId;
    // components: ComponentInterface[];
    checkpoint: boolean;
    progressBarEnabled: boolean;
    buttons: {save: boolean, print: boolean, previous: boolean, next: boolean};
    sections: [
        {
            type: string;
            padding: string[4];
            markdown: string;
            alignment: string;
        }
    ];
}

const SlideSchema = new Schema<SlideInterface>(
    {
        // components: [ComponentSchema],
        checkpoint: {
            type: Boolean,
            required: true
        },
        progressBarEnabled: {
            type: Boolean,
            required: true
        },
        buttons: {save: Boolean, print: Boolean, previous: Boolean, next: Boolean},
        sections: [{
            type: String,
            padding: String[4],
            markdown: String,
            alignment: String
        }]
    },
    {
        timestamps: true,
    },
);

const Slide = models.Slide || model<SlideInterface>("Slide", SlideSchema);

export { Slide, SlideSchema };
