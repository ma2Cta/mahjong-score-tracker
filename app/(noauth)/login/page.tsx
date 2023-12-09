"use client";

import { useEffect, useState } from "react";
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import Link from "next/link";
import OtherLoginButton from "@/app/_components/login/OtherLoginButton";
import GoogleLoginButton from "@/app/_components/login/GoogleLoginButton";

const Login: React.FC = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="container px-4">
        <div className="grid gap-6 items-center">
          <div className="flex flex-col justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-6xl font-bold">🀀 Mahjong Score Tracker</h1>
              <p className="max-w-[600px] md:text-xl mx-auto">
                麻雀の戦績を管理するためのアプリケーションです。
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2 mx-auto flex justify-center">
              {providers &&
                Object.values(providers).map((provider) =>
                  provider.id === "google" ? (
                    <GoogleLoginButton key={provider.id} provider={provider} />
                  ) : (
                    <OtherLoginButton key={provider.id} provider={provider} />
                  ),
                )}
            </div>
            <p className="text-xs">
              ログインすることで
              <Link className="underline underline-offset-2" href="/terms">
                利用規約
              </Link>
              に同意したものとします。
            </p>
            <p className="text-xs">&copy; 2023 ma2Cta All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
