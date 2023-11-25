import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bottom-0 left-0 w-full text-center py-3">
      <p className="font-thin text-xs">&copy; 2023 ma2Cta All Rights Reserved. <Link href="/terms" className="underline">利用規約</Link></p>
    </footer>
  );
}

export default Footer;
