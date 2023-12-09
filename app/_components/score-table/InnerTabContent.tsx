"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import ScoreTable from "@/app/_components/score-table/ScoreTable";
import React from "react";

interface InnerTabContentProps {
  isChild: boolean;
  defaultTsumo: boolean;
  setIsTsumo: (arg: boolean) => void;
}
const InnerTabContent: React.FC<InnerTabContentProps> = ({
  isChild,
  defaultTsumo,
  setIsTsumo,
}) => {
  return (
    <Tabs defaultValue={defaultTsumo ? "tsumo" : "ron"} className="w-full">
      <TabsList className="w-full">
        <TabsTrigger
          value="ron"
          className="w-full"
          onClick={() => setIsTsumo(false)}
        >
          ロン
        </TabsTrigger>
        <TabsTrigger
          value="tsumo"
          className="w-full"
          onClick={() => setIsTsumo(true)}
        >
          ツモ
        </TabsTrigger>
      </TabsList>
      <TabsContent value="ron">
        <ScoreTable isChild={isChild} isTsumo={false} />
      </TabsContent>
      <TabsContent value="tsumo">
        <ScoreTable isChild={isChild} isTsumo={true} />
      </TabsContent>
    </Tabs>
  );
};

export default InnerTabContent;
