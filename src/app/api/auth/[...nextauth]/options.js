import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcrypt";

export const options = {
	providers: [
		GitHubProvider({
			profile(profile) {
				console.log("Profile (GitHub): ", profile);

				let userRole = "user";
				//! Add admin email here
				if (profile?.email == "narayanananth26@gmail.com") {
					userRole = "admin";
				}

				return {
					...profile,
					role: userRole,
				};
			},
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		GoogleProvider({
			profile(profile) {
				console.log("Profile (Google): ", profile);

				let userRole = "user";
				//! Add admin email here
				if (profile?.email == "narayanananth26@gmail.com") {
					userRole = "admin";
				}

				return {
					...profile,
					id: profile.sub,
					role: userRole,
				};
			},
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				emailOrUsername: {
					label: "Email or username",
					type: "text",
					placeholder: "Email or username",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "Password",
				},
			},
			async authorize(credentials) {
				try {
					const user = await User.findOne({
						$or: [
							{ email: credentials.emailOrUsername },
							{ username: credentials.emailOrUsername },
						],
					})
						.lean()
						.exec();

					if (user) {
						console.log("User found");
						const passwordMatch = await bcrypt.compare(
							credentials.password,
							user.password
						);

						if (passwordMatch) {
							console.log("Password is correct");
							delete user.password;

							user["role"] = "user";
							//! Add admin email here
							if (user.email === "narayanananth26@gmail.com") {
								user["role"] = "admin";
							}
							return user;
						}
					}
				} catch (error) {
					console.log(error);
				}
				return null;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) token.role = user.role;
			return token;
		},
		async session({ session, token }) {
			if (session?.user) session.user.role = token.role;
			return session;
		},
	},
	pages: {
		signIn: "/sign-in",
	},
};
