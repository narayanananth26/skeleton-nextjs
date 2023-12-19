"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInFormSchema } from "@/lib/validations";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignIn = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const form = useForm({
		resolver: zodResolver(signInFormSchema),
		default: {
			emailOrUsername: "",
			password: "",
		},
	});

	const handleSubmit = async (values) => {
		setIsLoading(true);
		try {
			const res = await signIn("credentials", {
				...values,
				redirect: false,
			}).then(() => {
				router.push("/");
			});

			if (res.error) {
				router.push("/sign-in?success=false");
				setErrorMessage(res.message);
			} else {
				setErrorMessage("");
			}
		} catch (error) {
			console.log(error.message);
		} finally {
			setIsLoading(false);
			console.log(errorMessage);
			// form.reset(defaultValue);
		}
	};

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<FormField
						control={form.control}
						name="emailOrUsername"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email or username</FormLabel>
								<FormControl>
									<Input
										placeholder="Email or username"
										type="text"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										placeholder="Password"
										type="password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
};

export default SignIn;
