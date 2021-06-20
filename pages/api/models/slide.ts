import { model, Schema, Types } from "mongoose";
import { ComponentInterface, ComponentSchema } from "./component";

export interface SlideInterface {
    _id: Types.ObjectId;
    components: ComponentInterface[];
}

const SlideSchema = new Schema<SlideInterface>(
    {
        components: [ComponentSchema],
    },
    {
        timestamps: true,
    },
);

const Slide = model<SlideInterface>("Slide", SlideSchema);

export { Slide, SlideSchema };
