import { models, model, Schema, Types } from "mongoose";
import { SectionInterface, SectionSchema } from "./section";


export interface SlideInterface {
    _id: Types.ObjectId;
    checkpoint: boolean;
    progressBarEnabled: boolean;
    buttons: {save: boolean, print: boolean, previous: boolean, next: boolean};
    sections: SectionInterface[];

}

const SlideSchema = new Schema<SlideInterface>(
    {
        checkpoint: {
            type: Boolean,
            required: true
        },
        progressBarEnabled: {
            type: Boolean,
            required: true
        },
        buttons: {save: Boolean, print: Boolean, previous: Boolean, next: Boolean},
        sections: [SectionSchema]
    },
    {
        timestamps: true,
    },
);

const Slide = models.Slide || model<SlideInterface>("Slide", SlideSchema);

export { Slide, SlideSchema };
