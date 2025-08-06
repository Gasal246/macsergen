import connectDB from "@/lib/mongo";
import Mac_addresses from "@/models/mac_addresses.model";
import Modules from "@/models/modules.model";
import { NextResponse } from "next/server";

connectDB();

export async function GET() {
  try {
    const modules = await Modules.find();
    const moduleIds = modules.map((item: any) => item._id);

    const macs = await Mac_addresses.find({ module_id: { $in: moduleIds } });
    const allocated = macs.filter((item: any) => item.used === true);
    const unallocated = macs.filter((item: any) => item.used === false);
    const allocatedMap = allocated.reduce((acc: any, mac) => {
      const id = mac.module_id.toString();
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});
    const unallocatedMap = unallocated.reduce((acc: any, mac) => {
      const id = mac.module_id.toString();
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    const result = modules.map((module: any) => {
        const id = module._id.toString();
        return {
          ...module.toObject(),
          assigned_count: allocatedMap[id] || 0,
          unallocated_count: unallocatedMap[id] || 0,
        };
      });

    return NextResponse.json({ modules: result }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Modules not found" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
