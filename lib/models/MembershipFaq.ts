import { Schema, model, models } from "mongoose";

export interface MembershipFaq {
  question: string;
  answer: string;
}

const MembershipFaqSchema = new Schema<MembershipFaq>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const MembershipFaqModel =
  models.MembershipFaq ||
  model<MembershipFaq>("MembershipFaq", MembershipFaqSchema);
