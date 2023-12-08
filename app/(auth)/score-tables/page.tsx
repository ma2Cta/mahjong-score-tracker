"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import InnerTabContent from "@/app/_components/score-table/InnerTabContent";
import { useState } from "react";

const ScoreTablesPage = () => {
  const [isTsumo, setIsTsumo] = useState<boolean>(false);
  return (
    <>
      <Tabs defaultValue="child" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="child" className="w-full">
            子
          </TabsTrigger>
          <TabsTrigger value="parent" className="w-full">
            親
          </TabsTrigger>
        </TabsList>
        <TabsContent value="child">
          <InnerTabContent
            isChild={true}
            defaultTsumo={isTsumo}
            setIsTsumo={setIsTsumo}
          />
        </TabsContent>
        <TabsContent value="parent">
          <InnerTabContent
            isChild={false}
            defaultTsumo={isTsumo}
            setIsTsumo={setIsTsumo}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ScoreTablesPage;
