"use server";

import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/lib/models/User";
import { signToken, setSessionCookie, clearSessionCookie } from "@/lib/auth";
import bcrypt from "bcryptjs";
export async function login(_prevState: unknown, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Completá todos los campos." };
    }

    try {
        await connectDB();
        const user = await UserModel.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return { error: "Credenciales inválidas." };
        }

        const token = await signToken({ userId: user._id.toString(), email: user.email });
        await setSessionCookie(token);
    } catch (error) {
        console.error(error, "error");
        return { error: "Error del servidor. Intentá de nuevo." };
    }

    redirect("/admin");
}

export async function logout() {
    await clearSessionCookie();
    redirect("/admin/login");
}