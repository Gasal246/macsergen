import MainTab from "@/components/shared/MainTab";
import { Toaster } from "@/components/ui/sonner"

export default function Home() {
  return (
    <div className="p-4 lg:p-10 lg:pt-4">
      <h1 className="text-white text-4xl font-bold font-mono mb-6">Macsergen</h1>
      <MainTab />
      <Toaster />
    </div>
  );
}
