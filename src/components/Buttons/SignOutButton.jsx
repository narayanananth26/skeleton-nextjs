"use client";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
	const router = useRouter();
	return (
		<Button
			onClick={() => {
				signOut({ redirect: false }).then(() => {
					router.push("/sign-in");
				});
				console.log("sign out success");
			}}
		>
			Sign Out
		</Button>
	);
};

export default SignOutButton;
