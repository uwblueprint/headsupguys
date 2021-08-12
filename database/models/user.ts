import { models, model, Schema } from "mongoose";

export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER ADMIN",
}

export interface UserInterface {
    _id: Schema.Types.ObjectId;
    email: string;
    name: string;
    role: Role;
    waiverSigned: boolean;
    demographicInfo: unknown;
}

const UserSchema = new Schema<UserInterface>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        role: {
            type: Role,
            default: Role.USER,
        },
        waiverSigned: {
            type: Boolean,
            default: false,
        },
        demographicInfo: {
            type: Schema.Types.Mixed,
            required: null,
        },
    },
    {
        timestamps: true,
    },
);

const User = models.User || model<UserInterface>("User", UserSchema);

export { User, UserSchema };
