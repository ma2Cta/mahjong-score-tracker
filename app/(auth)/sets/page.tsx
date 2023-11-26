import Link from "next/link";
import SetList from "@/app/_components/set/SetList";
import { Button } from "@/app/_components/ui/button";
import TypographyH2 from "@/app/_components/ui/TypographyH2";
import BreadCrumbs from "@/app/_components/ui/BreadCrumbs";

const Sets: React.FC = () => {
  return (
    <div>
      <BreadCrumbs crumbs={[{ name: "セット一覧", path: "" }]} />
      <div className="flex justify-between items-center">
        <TypographyH2>セット一覧</TypographyH2>
        <Link href="/sets/create">
          <Button>新しいセットを作成</Button>
        </Link>
      </div>
      <SetList />
    </div>
  );
};

export default Sets;
