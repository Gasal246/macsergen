import connectDB from "@/lib/mongo";
import Mac_addresses from "@/models/mac_addresses.model";
import Modules from "@/models/modules.model";
import Serial_numbers from "@/models/serial_numbers.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST (req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        const lastMacId = await Mac_addresses.find().sort({ _id: -1 }).limit(1);
        const lastSerialNumber = await Serial_numbers.find().sort({ _id: -1 }).limit(1);

        const moduleMacIds = await Mac_addresses.find({ module_id: body.moduleId });
        const moduleSerialNumbers = await Serial_numbers.find({ module_id: body.moduleId });

        const removableMacIds = moduleMacIds?.filter((item: any) => item?.module_id !== lastMacId[0]?.module_id);
        const removableSerialNumbers = moduleSerialNumbers?.filter((item: any) => item?.module_id !== lastSerialNumber[0]?.module_id);

        await Mac_addresses.deleteMany({ _id: { $in: removableMacIds?.map((item: any) => item?._id) } });
        await Serial_numbers.deleteMany({ _id: { $in: removableSerialNumbers?.map((item: any) => item?._id) } });

        await Modules.findByIdAndDelete(body.moduleId);
        return NextResponse.json({ message: "Module deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';