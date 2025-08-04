"use client"
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import axios from 'axios';
import { storeGenerateIdsModal } from '@/redux/slices/applicationSlice';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
    module_id: z.string().min(2, {
        message: "Module name must be at least 2 characters.",
    }),
    count: z.string().min(1, {
        message: "Count must be at least 1.",
    }),
    isNew: z.boolean(),
})


const GenerateIDsDialogue = ({ moduleList }: { moduleList: any[] }) => {
    const [generated, setGenerated] = useState<any>(null);
    const [saved, setIsSaved] = useState(false);
    const { generateIdsModal } = useSelector((state: RootState) => state.application);
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            module_id: "",
            count: "",
            isNew: true,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        try {
            const res = await axios.post(`/api/generateid`, values);
            if(res?.status === 200) {
                toast.success("IDs generated successfully")
                setGenerated(res.data?.generated);
                setIsSaved(false);
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    };

    const handleSaveIds = async () => {
        setLoading(true)
        try {
            const res = await axios.post(`/api/saveids`, {
                module_id: form.getValues().module_id,
                isNew: form.getValues().isNew,
                macIds: generated?.macIds,
                serialNumbers: generated?.serialNumbers,
            });
            if(res?.status === 200) {
                toast.success("IDs saved successfully")
                setIsSaved(true);
                handleCloseDialoge();
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const handleCloseDialoge = () => {
        if(generated && !saved) {
            const result = confirm("Are you sure want to close without saving? You will lose your generated IDs.")
            if(!result) return;
        }
        dispatch(storeGenerateIdsModal(false))
        form.reset()
        setGenerated(null)
        setIsSaved(false)
    };

    return (
        <Dialog open={generateIdsModal} onOpenChange={handleCloseDialoge}>
            <DialogContent className='bg-zinc-800/30 backdrop-blur-sm min-w-[50%]'>
                <DialogHeader>
                    <DialogTitle className='text-white'>{generated ? `Generated ${generated?.macIds?.length} IDs` : "Generate IDs"}</DialogTitle>
                    <DialogDescription className='text-neutral-400'>{generated ? "Dispalying generated IDs for this module." : "Please fill the form below to generate IDs."}</DialogDescription>
                </DialogHeader>
                {!generated && <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                            <FormField
                                control={form.control}
                                name="module_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-white'>Select Module</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl className='w-full lg:w-[50%] text-white'>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a module" className='text-white' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {moduleList.map((module: any) => (
                                                    <SelectItem key={module?._id} value={module?._id}>{module?.module_name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isNew"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm w-full lg:w-[50%]">
                                        <div className="space-y-0.5">
                                            <FormLabel className='text-white'>{form.getValues().isNew ? "Generate New IDs" : "Generate IDs from Old IDs"}</FormLabel>
                                            <FormDescription className='text-neutral-400 text-xs font-semibold'>
                                                {form.getValues().isNew ? "Generate New IDs" : "Generate IDs from Old IDs"}
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                aria-readonly
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="count"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-white'>Enter Count</FormLabel>
                                        <FormControl className='w-full lg:w-[50%]'>
                                            <Input placeholder="Count of ID Required" type="number" className='text-white' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                className='bg-gradient-to-br from-neutral-800 to-neutral-900 cursor-pointer border border-transparent hover:border-slate-500'
                                type="submit"
                                disabled={loading}
                            >
                                Generate IDs
                            </Button>
                        </form>
                    </Form>
                </div>}
                {generated && <div>
                    <div className="flex flex-wrap">
                        <div className="w-1/2 p-2">
                            <h1 className="text-white text-2xl font-bold text-center">Mac IDs</h1>
                            <div className="flex flex-wrap">
                                {generated?.macIds?.map((macId: string, index: number) => (
                                    <div key={index} className="w-1/2 p-2">
                                        <p className="text-white">{macId}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-1/2 p-2 lg:border-l lg:border-neutral-300">
                            <h1 className="text-white text-2xl font-bold text-center">Serial Numbers</h1>
                            <div className="flex flex-wrap">
                                {generated?.serialNumbers?.map((serialNumber: string, index: number) => (
                                    <div key={index} className="w-1/2 p-2">
                                        <p className="text-white">{serialNumber}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            className='bg-gradient-to-br from-neutral-800 to-neutral-900 cursor-pointer border border-transparent hover:border-slate-500'
                            onClick={handleSaveIds}
                            disabled={loading}
                        >
                            Save IDs
                        </Button>
                    </div>
                </div>}
            </DialogContent>
        </Dialog>
    )
}

export default GenerateIDsDialogue