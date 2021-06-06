import { model, Schema } from "mongoose";
import { ModuleInterface } from "./module";

//The following file is a placeholder, to be overwritten with the actual Tool Interface
export interface ToolInterface {
    _id: Schema.Types.ObjectId;
    module: ModuleInterface["_id"];
}

const ToolSchema = new Schema<ToolInterface>({
    module: {
        type: Schema.Types.ObjectId,
    },
});

const Tool = model("Tool", ToolSchema);

export { Tool };
