import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/app/_components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Home() {
  return (
    <>
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>本アプリは開発中です。</AlertTitle>
        <AlertDescription>
          本アプリは開発中のため、データが消えたり、不具合が発生する可能性があります。
        </AlertDescription>
      </Alert>
    </>
  );
}
