import Image from "next/image";
import UseClientHeaderMenu from "@/components/UseClientHeaderMenu";
import UseClientHeaderMenuMobile from "@/components/UseClientHeaderMenuMobile";
import SignIn from "@/components/SignIn";
import { logtoConfig } from "../logto";
import { getLogtoContext, signIn, signOut } from "@logto/next/server-actions";
import SignOut from "@/components/SignOut";

export default async function Header() {
  const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Integra.to</span>
            <Image
              src="/logo_transparent_shrinked.png"
              width={256}
              height={64}
              alt="Integrato logo"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          {/* <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button> */}
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <UseClientHeaderMenu />
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {!isAuthenticated ? (
            <SignIn
              onSignIn={async () => {
                "use server";

                await signIn(logtoConfig);
              }}
            />
          ) : (
            <div>
              {claims?.username}
              <SignOut
                onSignOut={async () => {
                  "use server";

                  await signOut(logtoConfig);
                }}
              />
            </div>
          )}
        </div>
      </nav>
      <UseClientHeaderMenuMobile />
    </header>
  );
}
