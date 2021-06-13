import { model, Schema } from "mongoose";

//The following file is a placeholder, to be overwritten with the actual Slide Interface
export interface SlideInterface {
    _id: Schema.Types.ObjectId;
}

const SlideSchema = new Schema<SlideInterface>({
    module: {
        type: Schema.Types.ObjectId,
    },
});

const Slide = model("Slide", SlideSchema);

export { Slide };
