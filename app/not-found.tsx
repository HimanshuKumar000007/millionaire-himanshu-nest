import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 p-8 text-center space-y-4 shadow-lg">
        <h1 className="text-4xl font-black text-[#4F46E5]">404</h1>
        <h2 className="text-xl font-bold">Page Not Found</h2>
        <p className="text-xs text-gray-500">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="pt-2">
          <Link href="/">
            <Button className="w-full bg-[#4F46E5] hover:bg-indigo-700 font-bold text-xs">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
