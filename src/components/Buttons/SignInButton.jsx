"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const SignInButton = () => {
	const router = useRouter();
	return <Button onClick={() => router.push("/sign-in")}>Sign in</Button>;
};

export default SignInButton;
