import { Button } from "@/app/_components/ui/button";
import { ClientSafeProvider, signIn } from "next-auth/react";

interface OtherLoginButtonProps {
  provider: ClientSafeProvider;
}

const OtherLoginButton: React.FC<OtherLoginButtonProps> = ({ provider }) => {
  return (
    <Button onClick={() => signIn(provider.id)}>
      {provider.name}でログイン
    </Button>
  );
};

export default OtherLoginButton;
