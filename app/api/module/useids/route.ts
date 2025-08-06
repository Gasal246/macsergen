import connectDB from "@/lib/mongo";
import Mac_addresses from "@/models/mac_addresses.model";
import Modules from "@/models/modules.model";
import Serial_numbers from "@/models/serial_numbers.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req: NextRequest ) {
    try {
        const body = await req.json();

        switch(body?.type) {
            case "mac":
                await Mac_addresses.findByIdAndUpdate(body?.id, { used: body?.used });
                break;
            case "serial":
                await Serial_numbers.findByIdAndUpdate(body?.id, { used: body?.used });
                break;
            default:
                break;
        }
        
        return NextResponse.json({ message: "IDs updated successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Update IDs failed, Internal Server Error" }, { status: 500 });
    }
}

export const dynamic = "force-dynamic";

