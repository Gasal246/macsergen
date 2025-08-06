import connectDB from "@/lib/mongo";
import Mac_addresses from "@/models/mac_addresses.model";
import Modules from "@/models/modules.model";
import Serial_numbers from "@/models/serial_numbers.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST ( req: NextRequest, res: NextResponse ) {
    try {
        const body = await req.json();
        const module = await Modules.findById(body?.module_id);
        if(!module) throw new Error("Module not found");

        async function saveIds() {
            const macstosave = body?.macIds.map((mac: string) => {
                return {
                    mac_address: mac,
                    module_id: body?.module_id
                }
            })
            await Mac_addresses.insertMany(macstosave);
            const serialstosave = body?.serialNumbers.map((serial: string) => {
                return {
                    serial_number: serial,
                    module_id: body?.module_id
                }
            })
            await Serial_numbers.insertMany(serialstosave);
        }

        if(!body?.isNew) {
            await saveIds();
            return NextResponse.json({ message: "IDs saved successfully" }, { status: 200 });
        }

        await Mac_addresses.deleteMany({ module_id: body?.module_id });
        await Serial_numbers.deleteMany({ module_id: body?.module_id });
        await saveIds();
        
        return NextResponse.json({ message: "IDs saved successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Save IDs failed, Internal Server Error" }, { status: 500 });
    }
}

export const dynamic = "force-dynamic";
