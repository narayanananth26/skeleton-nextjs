import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";

export async function POST(req) {
	try {
		const body = await req.json();
		const userData = body.formData;

		// Check if data exists
		if (!userData?.email || !userData.password)
			return NextResponse.json(
				{ message: "All fields are required" },
				{ status: 400 }
			);

		// Check for duplicate emails
		const duplicate = await User.findOne({ email: userData.email })
			.lean()
			.exec();
		if (duplicate)
			return NextResponse.json(
				{ message: "Duplicate email" },
				{ status: 409 }
			);

		const hashedPassword = await bcrypt.hash(userData.password, 10);
		userData.password = hashedPassword;

		await User.create(userData);
		return NextResponse.json({ message: "User created" }, { status: 201 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Error", error }, { status: 500 });
	}
}
