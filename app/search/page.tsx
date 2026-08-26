import { Suspense } from "react";
import SearchContent from "./SearchContent";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-2xl font-semibold text-gray-600">
            Loading Search...
          </div>
        </main>
      }
    >
      <SearchContent />
    </Suspense>
  );
}