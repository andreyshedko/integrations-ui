'use client'

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function UseClientHeaderMenu() {
    const t = useTranslations("HomePage");
  return (
    <>
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
    </>
  );
}
