import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import {
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { getSession } from "@auth0/nextjs-auth0";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Integrations",
  description: "Integrations Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const user = await getSession();
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <Navbar position="static">
            <NavbarContent
              className="hidden sm:flex gap-4"
              justify="center"
            ></NavbarContent>
            <NavbarItem>
              <Link color="foreground" href="/delivery_providers">
                Delivery Providers
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/payment">
                Payment Providers
              </Link>
            </NavbarItem>
            <NavbarItem>
              {user?.user ? (
                <Link color="foreground" href="api/auth/logout">
                  Logout
                </Link>
              ) : (
                <Link color="foreground" href="api/auth/login">
                  Login
                </Link>
              )}
            </NavbarItem>
          </Navbar>
          {user?.user && children}
        </body>
      </UserProvider>
    </html>
  );
}
