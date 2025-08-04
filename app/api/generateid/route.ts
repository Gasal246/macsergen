import connectDB from "@/lib/mongo";
import Modules from "@/models/modules.model";
import { NextRequest, NextResponse } from "next/server";
import { generateDeviceIdentifiers } from "@/lib/jsutils";

connectDB();

export async function POST ( req: NextRequest, res: NextResponse ) {
    try {
        const body = await req.json();

        const module = await Modules.findById(body?.module_id);
        if(!module) throw new Error("Module not found");

        let generated;
        if(!body?.isNew) {
            if(module?.macIds?.length === 0 || module?.serialNumbers?.length === 0) throw new Error("Module has no IDs");
            const previousMacIds = module?.macIds;
            const previousSerialNumbers = module?.serialNumbers;

            generated = generateDeviceIdentifiers({
                count: body?.count,
                lastMac: previousMacIds?.[previousMacIds?.length - 1],
                lastSerial: previousSerialNumbers?.[previousSerialNumbers?.length - 1],
                suffix: module?.suffix || '',
                regionId: body?.regionId
            });
        }

        generated = generateDeviceIdentifiers({
            count: body?.count,
            lastMac: null,
            lastSerial: null,
            suffix: module?.suffix || '',
            regionId: body?.regionId
        });

        return NextResponse.json({ generated }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Generate IDs failed" }, { status: 500 });
    }
}

export const dynamic = "force-dynamic";
