"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TypographyH2 from "@/app/_components/ui/TypographyH2";
import CreateSetForm from "@/app/_components/create_set_form/CreateSetForm";

const CreateSet: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <TypographyH2>新しいセットを作成</TypographyH2>
          <Link className="underline underline-offset-2" href="/sets">
            一覧に戻る
          </Link>
        </div>
      </div>
      <div className="my-4">
        <CreateSetForm onSuccess={() => router.push("/sets")}/>
      </div>
    </>
  );
};

export default CreateSet;
