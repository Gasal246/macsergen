import { generateDeviceIdentifiers } from "@/lib/jsutils";
import connectDB from "@/lib/mongo";
import Mac_addresses from "@/models/mac_addresses.model";
import Modules from "@/models/modules.model";
import Serial_numbers from "@/models/serial_numbers.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req: NextRequest ) {
    try {
        const body = await req.json();
        
        const module = await Modules.findById(body?.module_id);
        if(!module) throw new Error("Module not found");
        const lastMac = await Mac_addresses.find().sort({ _id: -1 }).limit(1);
        const lastSerialNumber = await Serial_numbers.find().sort({ _id: -1 }).limit(1);

        let generated;
        if(body?.isNew) {
            await Mac_addresses.deleteMany({ module_id: body.module_id });
            await Serial_numbers.deleteMany({ module_id: body.module_id });
            generated = generateDeviceIdentifiers({
                count: body?.count,
                lastMac: lastMac[0]?.mac_address || null,
                lastSerial: lastSerialNumber[0]?.serial_number || null,
                suffix: module?.telx_model_number || '',
                regionId: body?.regionId || ''
            });
        } else {
            generated = generateDeviceIdentifiers({
                count: body?.count,
                lastMac: lastMac[0]?.mac_address || null,
                lastSerial: lastSerialNumber[0]?.serial_number || null,
                suffix: module?.telx_model_number || '',
                regionId: body?.regionId || ''
            });
        }

        return NextResponse.json({ generated }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Generate IDs failed, Internal Server Error" }, { status: 500 });
    }
};

export const dynamic = "force-dynamic";
