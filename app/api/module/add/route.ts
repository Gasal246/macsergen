import connectDB from "@/lib/mongo";
import Modules from "@/models/modules.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST ( req: NextRequest ) {
    try {
        const body = await req.json();
        console.log(body);
        const newModule = new Modules({ 
            model_number: body.modal_number,
            telx_model_number: body.telx_model_number,
            suffix: body.suffix || '',
            description: body.description,
            qty: body.qty,
            chipset: body.chipset,
            ap_type: body.ap_type 
        });
        await newModule.save();
        return NextResponse.json({ message: "Module added successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Module added failed" }, { status: 500 });
    }
}

export const dynamic = "force-dynamic";
