import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import SignOutButton from "./Buttons/SignOutButton";
import SignInButton from "./Buttons/SignInButton";

const Nav = async () => {
	const session = await getServerSession(options);
	return (
		<header className="bg-gray-600 text-gray-100">
			<nav className="flex-between w-full px-10 py-4">
				<div>My site</div>
				<div className="flex-center gap-10">
					<Link href="/">Home</Link>
					<Link href="/CreateUser">CreateUser</Link>
					<Link href="/ClientMember">ClientMember</Link>
					<Link href="/Member">Member</Link>
					<Link href="/Public">Public</Link>
					{session ? <SignOutButton /> : <SignInButton />}
				</div>
			</nav>
		</header>
	);
};

export default Nav;
