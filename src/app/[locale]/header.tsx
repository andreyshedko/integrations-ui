import Image from "next/image";
import UseClientHeaderMenu from "@/components/UseClientHeaderMenu";
import UseClientHeaderMenuMobile from "@/components/UseClientHeaderMenuMobile";
import SignIn from "@/components/SignIn";
import { logtoConfig } from "../logto";
import { getLogtoContext, signIn, signOut } from "@logto/next/server-actions";
import SignOut from "@/components/SignOut";
import { Link } from "@/i18n/routing";
import LanguageSelectMenu from "@/components/LanguageSelectMenu";

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
        <div className="hidden lg:flex lg:flex-1 lg:justify-end md:flex md:justify-end items-end">
          {!isAuthenticated ? (
            <SignIn
              onSignIn={async () => {
                "use server";

                await signIn(logtoConfig);
              }}
            />
          ) : (
            <div className="grid grid-cols-3 gap-4 items-center justify-items-center cursor-pointer">
              <Link
                href="/profile"
                className="mr-4 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {claims?.username}
              </Link>
              <SignOut
                onSignOut={async () => {
                  "use server";

                  await signOut(logtoConfig);
                }}
              />
            </div>
          )}
          <LanguageSelectMenu />
        </div>
      </nav>
      <UseClientHeaderMenuMobile />
    </header>
  );
}
