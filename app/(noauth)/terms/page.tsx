"use client";

import TypographyH1 from "@/app/_components/ui/TypographyH1";
import TypographyH2 from "@/app/_components/ui/TypographyH2";
import { useRouter } from "next/navigation";

const Terms: React.FC = () => {
  const router = useRouter();

  return (
    <div className="m-10">
      <TypographyH1 className="my-4">利用規約</TypographyH1>
      <TypographyH2 className="my-2">1.適用範囲</TypographyH2>
      <p>
        本規約は、「Mahjong Score
        Tracker」（以下、「本サービス」といいます）の提供するサービスの利用条件を定めるものです。
      </p>
      <TypographyH2 className="my-2">2.利用登録</TypographyH2>
      <p>
        利用者は、Googleアカウントを使用して本サービスにログインすることで、本規約に同意したものとみなします。
      </p>
      <p>
        利用者は、登録情報に変更があった場合、速やかに情報を更新するものとします。
      </p>
      <TypographyH2 className="my-2">3.個人情報の取り扱い</TypographyH2>
      <p>
        本サービスは、利用者の個人情報（Emailアドレス等）を適切に管理し、日本の個人情報保護法に基づき、適切に取り扱います。
      </p>
      <p>
        個人情報は、本サービスの提供、改善、および利用者からの問い合わせ対応の目的でのみ使用し、これらの目的以外での使用または第三者への開示・提供は行いません。
      </p>
      <TypographyH2 className="my-2">4.禁止事項</TypographyH2>
      <p>本サービスを不正に利用する行為。 法令または公序良俗に反する行為。</p>
      <p>その他、本サービスが不適切と判断する行為。</p>
      <TypographyH2 className="my-2">5.免責事項</TypographyH2>
      <p>
        本サービスは、サービスの中断、遅延、中止、データの紛失または不正アクセスが発生した場合でも、一切の責任を負わないものとします。
      </p>
      <p>
        本サービスは、利用者間のコミュニケーションやトラブルに関して、一切の責任を負わないものとします。
      </p>
      <TypographyH2 className="my-2">6.規約の変更</TypographyH2>
      <p>
        本サービスは、必要に応じて、本規約を変更することができるものとします。変更後の利用規約は、本サービス上に表示された時点で効力を発生するものとします。
      </p>
      <p>
        準拠法・裁判管轄
        本規約の解釈および適用は、日本法に準拠するものとします。
      </p>
      <p>
        本サービスに関連して生じた紛争については、[本サービスの運営者の所在地を管轄する裁判所]を専属的な合意管轄とします。
      </p>
      <div
        className="mt-4 underline text-center cursor-pointer"
        onClick={() => router.back()}
      >
        戻る
      </div>
    </div>
  );
};

export default Terms;
