import { Schema, model, models } from "mongoose";

export interface Membership {
    name: string;
    description: string;
    price: number;
    quarterlyPrice?: number;
    features: string[];
    tag?: string;
    bottomText?: string;
    featured: boolean;
    order: number;
}

const MembershipSchema = new Schema<Membership>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        quarterlyPrice: { type: Number },
        features: { type: [String], required: true },
        tag: { type: String },
        bottomText: { type: String },
        featured: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

export const MembershipModel =
    models.Membership || model<Membership>("Membership", MembershipSchema);