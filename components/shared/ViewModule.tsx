"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { ModuleShowTable } from './DataTables/ModuleShowTable'
import { moduleShowColumns } from './TableColumns/ModuleShowColumn'
import { MacAddressTable } from './DataTables/MacAddressTable'
import { macAddressColumns } from './TableColumns/MacAddressColumns'
import { SerialNumberTable } from './DataTables/SerialNumberTable'
import { serialNumberColumns } from './TableColumns/SerialNumberColoumn'
import axios from 'axios'
import GenerateIDsForModuleDialog from './Dialogs/GenerateIDsForModuleDialog'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { storeGenerateIdsForModuleModal } from '@/redux/slices/applicationSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { Sheet } from 'lucide-react'
import LoaderSpin from './Utility/LoaderSpin'
import { generateExcel } from '@/lib/generateExcel'

const GenerateIdOpener = () => {
    const dispatch = useDispatch<AppDispatch>();
    const handleOpenGenerateIdsModal = () => {
        dispatch(storeGenerateIdsForModuleModal(true));
    };
    return (
        <Button className='mb-5 cursor-pointer bg-gradient-to-br from-neutral-700 to-neutral-800 border border-transparent hover:border-neutral-600' onClick={handleOpenGenerateIdsModal}>Generate</Button>
    )
}

const ViewModule = ({ id }: { id: string }) => {
    const [module, setModule] = React.useState<any>(null);
    const [macAddresses, setMacAddresses] = React.useState<any>(null);
    const [serialNumbers, setSerialNumbers] = React.useState<any>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [generating, setGenerating] = React.useState<boolean>(false);

    React.useEffect(() => {
        fetchModule();
    }, [id]);

    const fetchModule = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/module/get/module?id=${id}`);
            setModule(res.data?.module);
            setMacAddresses(res.data?.macAddresses);
            setSerialNumbers(res.data?.serialNumbers);
        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadExcel = async () => {
        const module_data = {
            model_number: module?.model_number,
            telx_model_number: module?.telx_model_number,
            suffix: module?.suffix,
            description: module?.description,
            chipset: module?.chipset,
            type: module?.type,
            mac_allocated: module?.mac_allocated,
            sn_allocated: module?.serial_allocated,
        };

        setGenerating(true);
        await generateExcel(module_data, macAddresses, serialNumbers);
        setGenerating(false);
    };

    return (
        <Provider store={store}>
            <div className='p-5 lg:p-10'>
                <GenerateIDsForModuleDialog moduleId={id} module={module} getModulesFunction={fetchModule} />
                <div className="flex items-center justify-between">
                    <Link href=".."><Button className='mb-5 cursor-pointer border border-transparent hover:border-neutral-600'>{loading ? <div className="flex items-center gap-2"><LoaderSpin size={30} /> Loading...</div> : "Back To Modules"}</Button></Link>
                    <div className="flex items-center gap-2">
                        <GenerateIdOpener />
                        <Button className='mb-5 cursor-pointer bg-gradient-to-br from-neutral-700 to-neutral-800 border border-transparent hover:border-neutral-600 flex items-center gap-2' onClick={handleDownloadExcel}><Sheet size={20} color="white"/> Download Excel</Button>
                    </div>
                </div>
                <h1 className="text-neutral-300 text-xl font-bold px-1 mb-1">{loading ? "Loading Data..." : "Module Details"}</h1>
                <div className="bg-gradient-to-br from-neutral-400 to-neutral-500 p-1 rounded-lg">
                    <ModuleShowTable columns={moduleShowColumns} data={[module]} />
                </div>
                <div className='px-1 mb-1 mt-5 flex items-center justify-between'>
                    <h1 className="text-neutral-300 text-xl font-semibold">MAC Addresses & Serial Numbers</h1>
                </div>
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-1/2 p-1">
                        <div className="bg-gradient-to-br from-neutral-400 to-neutral-600 p-2 rounded-lg max-h-[65dvh] overflow-y-scroll">
                            <h1 className="text-neutral-900 text-sm font-bold px-1 mb-2 text-center">MAC Addresses</h1>
                            <MacAddressTable columns={macAddressColumns} data={macAddresses || []} />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 p-1">
                        <div className="bg-gradient-to-br from-neutral-400 to-neutral-600 p-2 rounded-lg max-h-[65dvh] overflow-y-scroll">
                            <h1 className="text-neutral-900 text-sm font-bold px-1 mb-2 text-center">Serial Numbers</h1>
                            <SerialNumberTable columns={serialNumberColumns} data={serialNumbers || []} />
                        </div>
                    </div>
                </div>
            </div>
        </Provider>
    )
}

export default ViewModule