"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TypographyH2 from "@/app/_components/ui/TypographyH2";
import CreateSetForm from "@/app/_components/set/CreateSetForm";
import BreadCrumbs from "@/app/_components/ui/BreadCrumbs";

const CreateSet: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <BreadCrumbs
        crumbs={[
          { name: "セット一覧", path: "/sets" },
          { name: "新しいセットを作成", path: "" },
        ]}
      />
      <TypographyH2>新しいセットを作成</TypographyH2>
      <div className="my-4">
        <CreateSetForm onSuccess={() => router.push("/sets")} />
      </div>
    </>
  );
};

export default CreateSet;
