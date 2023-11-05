"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
    return (
        <Button style={{marginRight: 10}} onClick={() => signOut()}>
            Sign Out
        </Button>
    );
};

export default LogoutButton;