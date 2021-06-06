import { model, Schema, Types } from "mongoose";
import { ComponentInterface, ComponentSchema } from "./component";

export interface SlideInterface {
    _id: Types.ObjectId;
    components: ComponentInterface[];
    previous?: Types.ObjectId;
    next?: Types.ObjectId;
}

const SlideSchema = new Schema<ComponentInterface>(
    {
        components: [ComponentSchema],
        previous: {
            type: Schema.Types.ObjectId,
        },
        next: {
            type: Schema.Types.ObjectId,
        },
    },
    {
        timestamps: true,
    },
);

const Slide = model<SlideInterface>("Slide", SlideSchema);

export { Slide, SlideSchema };
