import Link from "next/link";
import SetList from "@/app/_components/set/SetList";
import { Button } from "@/app/_components/ui/button";
import TypographyH2 from "@/app/_components/ui/TypographyH2";

const Sets: React.FC = () => {
  return (
    <div>
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
