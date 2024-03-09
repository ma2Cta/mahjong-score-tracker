"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TypographyH2 from "@/app/_components/ui/TypographyH2";
import CreateSetForm from "@/app/_components/set/CreateSetForm";
import BreadCrumbs from "@/app/_components/ui/BreadCrumbs";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";

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
        <Tabs defaultValue="four" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="four">四人麻雀</TabsTrigger>
            <TabsTrigger value="three">三人麻雀</TabsTrigger>
          </TabsList>
          <TabsContent value="four">
            <div className="my-4">
              <CreateSetForm
                onSuccess={() => router.push("/sets")}
                isThree={false}
              />
            </div>
          </TabsContent>
          <TabsContent value="three">
            <div className="my-4">
              <CreateSetForm
                onSuccess={() => router.push("/sets")}
                isThree={true}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default CreateSet;
