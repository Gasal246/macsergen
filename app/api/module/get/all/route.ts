import connectDB from "@/lib/mongo";
import Modules from "@/models/modules.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET ( req: NextRequest, res: NextResponse ) {
    try {
        const modules = await Modules.find();
        return NextResponse.json({ modules }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Modules not found" }, { status: 500 });
    }
}

export const dynamic = "force-dynamic";
