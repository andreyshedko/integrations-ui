"use client";

import { useTranslations } from "next-intl";

type Props = {
  onSignIn: () => Promise<void>;
};

const SignIn = ({ onSignIn }: Props) => {
  const t = useTranslations("HomePage");
  return (
    <button
      className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-sm font-semibold leading-6 text-gray-600"
      onClick={() => {
        onSignIn();
      }}
    >
      {t("signin")} <span aria-hidden="true">&rarr;</span>
    </button>
  );
};

export default SignIn;
