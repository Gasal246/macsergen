import connectDB from "@/lib/mongo";
import Mac_addresses from "@/models/mac_addresses.model";
import Serial_numbers from "@/models/serial_numbers.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST ( req: NextRequest ) {
    try {
        const body = await req.json();
        
        const macAddresses = await Mac_addresses.find({ module_id: body?.moduleId, used: false }).limit(body?.count);
        const serialNumbers = await Serial_numbers.find({ module_id: body?.moduleId, used: false }).limit(body?.count);

        await Mac_addresses.updateMany({ _id: { $in: macAddresses?.map((item: any) => item?._id) } }, { used: true });
        await Serial_numbers.updateMany({ _id: { $in: serialNumbers?.map((item: any) => item?._id) } }, { used: true });
        
        return NextResponse.json({ message: "IDs allocated successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export const dynamic = "force-dynamic";
