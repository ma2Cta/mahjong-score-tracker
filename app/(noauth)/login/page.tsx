"use client";

import LoginButton from "@/components/LoginButton";

const Login: React.FC = () => {
  return (
    <section className="w-full h-screen bg-background py-12 md:py-24 lg:py-32 xl:py-48">
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
              <LoginButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
