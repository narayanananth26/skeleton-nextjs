import Nav from "@/components/Nav";
import "@/app/globals.css";
import AuthProvider from "@/contexts/AuthProvider";

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<AuthProvider>
				<body className="bg-gray-100">
					<Nav />
					<div className="m-2">{children}</div>
				</body>
			</AuthProvider>
		</html>
	);
}
