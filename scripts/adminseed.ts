// scripts/adminseed.ts
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

// Inline connection
await mongoose.connect(process.env.MONGODB_URI!);

// Inline model
interface IUser { email: string; password: string; }
const UserSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});
const UserModel = models.User || model<IUser>("User", UserSchema);

// Seed
const existing = await UserModel.findOne({ email: "admin@admin.com" });
if (existing) {
  console.log("El usuario ya existe.");
  process.exit(0);
}

const hashed = await bcrypt.hash("test1234", 12);
await UserModel.create({ email: "admin@admin.com", password: hashed });
console.log("Usuario creado.");
process.exit(0);