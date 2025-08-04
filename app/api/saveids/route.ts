import connectDB from "@/lib/mongo";
import Modules from "@/models/modules.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST ( req: NextRequest, res: NextResponse ) {
    try {
        const body = await req.json();
        const module = await Modules.findById(body?.module_id);
        if(!module) throw new Error("Module not found");

        if(!body?.isNew) {
            const previousMacIds = module?.macIds;
            const previousSerialNumbers = module?.serialNumbers;

            module.macIds = [...previousMacIds, ...body?.macIds];
            module.serialNumbers = [...previousSerialNumbers, ...body?.serialNumbers];
            await module.save();
            return NextResponse.json({ message: "IDs saved successfully" }, { status: 200 });
        }

        module.macIds = body?.macIds;
        module.serialNumbers = body?.serialNumbers;
        await module.save();
        return NextResponse.json({ message: "IDs saved successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Save IDs failed, Internal Server Error" }, { status: 500 });
    }
}

export const dynamic = "force-dynamic";