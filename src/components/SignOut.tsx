"use client";

import { useTranslations } from "next-intl";

type Props = {
  onSignOut: () => Promise<void>;
};

const SignOut = ({ onSignOut }: Props) => {
  const t = useTranslations("HomePage");
  return (
    <button
      className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
      onClick={() => {
        onSignOut();
      }}
    >
      {t("signout")}
    </button>
  );
};

export default SignOut;
