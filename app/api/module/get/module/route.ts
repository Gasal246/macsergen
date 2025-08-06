import connectDB from "@/lib/mongo";
import Mac_addresses from "@/models/mac_addresses.model";
import Modules from "@/models/modules.model";
import Serial_numbers from "@/models/serial_numbers.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET ( req: NextRequest ) {
    try {
        const params = req.nextUrl.searchParams;
        const moduleId = params.get("id");

        const module = await Modules.findById(moduleId);
        const macAddresses = await Mac_addresses.find({ module_id: moduleId });
        const serialNumbers = await Serial_numbers.find({ module_id: moduleId });

        const usedMacs = macAddresses?.filter((item: any) => item.used === true);
        const usedSerialNumbers = serialNumbers?.filter((item: any) => item.used === true);

        return NextResponse.json({ module: {
            ...module?.toObject(),
            mac_allocated: `${usedMacs?.length}/${macAddresses?.length}`,
            serial_allocated: `${usedSerialNumbers?.length}/${serialNumbers?.length}`
        }, macAddresses, serialNumbers }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export const dynamic = "force-dynamic";