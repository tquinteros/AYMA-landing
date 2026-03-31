import { Schema, model, models } from "mongoose";

export interface Membership {
    name: string;
    description: string;
    price: number;
    features: string[];
    tag?: string;
    bottomText?: string;
    order: number;
}

const MembershipSchema = new Schema<Membership>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        features: { type: [String], required: true },
        tag: { type: String },
        bottomText: { type: String },
        order: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

export const MembershipModel =
    models.Membership || model<Membership>("Membership", MembershipSchema);