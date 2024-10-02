"use client"

import Image from "next/image";
import { ReactNode, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Header({
  children
}: {
  children: ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations("HomePage");
  
  return (
    <div className="bg-white flex flex-col justify-center h-lvh">
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
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link
              href="/product"
              className="text-sm font-semibold leading-6 text-gray-600"
            >
              {t("product")}
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-semibold leading-6 text-gray-600"
            >
              {t("pricing")}
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold leading-6 text-gray-600"
            >
              {t("about")}
            </Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-600"
            >
              {t("login")} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Integra.to</span>
                <Image
                  src="/logo_transparent_shrinked.png"
                  width={256}
                  height={64}
                  alt="Picture of the author"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    href="/product"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-600 hover:bg-gray-50"
                  >
                    {t("product")}
                  </Link>
                  <Link
                    href="/pricing"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-600 hover:bg-gray-50"
                  >
                    {t("pricing")}
                  </Link>
                  <Link
                    href="/about"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-600 hover:bg-gray-50"
                  >
                    {t("about")}
                  </Link>
                </div>
                <div className="py-6">
                  <Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-600 hover:bg-gray-50"
                  >
                    {t("login")}
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
      {children}
    </div>
  );
}
