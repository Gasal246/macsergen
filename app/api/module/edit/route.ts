import connectDB from "@/lib/mongo";
import Modules from "@/models/modules.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST ( req: NextRequest, res: NextResponse ) {
    try {
        const body = await req.json();
        const updateModule = await Modules.findByIdAndUpdate(body.moduleId, { module_name: body.module_name, suffix: body.suffix })
        return NextResponse.json({ message: "Module added successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Module added failed" }, { status: 500 });
    }
}

export const dynamic = "force-dynamic";