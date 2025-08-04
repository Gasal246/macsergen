import MainTab from "@/components/shared/MainTab";
import { Toaster } from "@/components/ui/sonner";
import SessionProvider from "@/lib/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);
  if(!session) {
    return redirect('/signin')
  }

  return (
    <div className="p-4 lg:p-10 lg:pt-4">
      <h1 className="text-white text-4xl font-bold font-mono mb-6">Macsergen</h1>
      <SessionProvider session={session}>
        <MainTab />
      </SessionProvider>
    </div>
  );
}
