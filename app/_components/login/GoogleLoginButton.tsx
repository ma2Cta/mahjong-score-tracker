import { ClientSafeProvider, signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

interface GoogleLoginButtonProps {
  provider: ClientSafeProvider;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ provider }) => {
  return (
    <Image
      src="/login/web_neutral_rd_SI@2x.png"
      alt="Sign in with Google"
      width={191}
      height={46}
      onClick={() => signIn(provider.id)}
      className="cursor-pointer hover:opacity-75"
    />
  );
};

export default GoogleLoginButton;
