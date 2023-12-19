import * as z from "zod";

export const signInFormSchema = z.object({
	emailOrUsername: z
		.string()
		.min(3, { message: "Too short, minimum 3 characters" })
		.max(50, { message: "Too long, maximum 50 characters" }),
	password: z
		.string()
		.min(8, { message: "Too short, minimum 8 characters" })
		.max(50, { message: "Too long, maximum 50 characters" }),
});
