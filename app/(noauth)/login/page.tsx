"use client";

import { useEffect, useState } from "react";
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
} from "next-auth/react";
import { BuiltInProviderType, Provider } from "next-auth/providers";
import { Button } from "@/app/components/ui/button";

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
              <h1 className="text-6xl font-bold">🀙 Mahjong Score Tracker</h1>
              <p className="max-w-[600px] md:text-xl mx-auto">
                麻雀の戦績を管理するためのアプリケーションです。
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2 mx-auto">
              {providers &&
                Object.values(providers).map((provider) => (
                  <div key={provider.id}>
                    <Button onClick={() => signIn(provider.id)}>
                      {provider.name}でログイン
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
