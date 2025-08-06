import connectDB from "@/lib/mongo";
import Modules from "@/models/modules.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST ( req: NextRequest, res: NextResponse ) {
    try {
        const body = await req.json();
        await Modules.findByIdAndUpdate(body.moduleId, { 
            model_number: body.modal_number,
            telx_model_number: body.telx_model_number,
            suffix: body.suffix,
            description: body.description,
            qty: body.qty,
            chipset: body.chipset,
            ap_type: body.ap_type 
        }, { new: true });
        return NextResponse.json({ message: "Module updated successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Module updated failed" }, { status: 500 });
    }
}

export const dynamic = "force-dynamic";