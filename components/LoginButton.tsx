"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const LoginButton = () => {
    return (
        <Button onClick={() => signIn()}>
            ログイン画面に移動
        </Button>
    );
};

export default LoginButton;
