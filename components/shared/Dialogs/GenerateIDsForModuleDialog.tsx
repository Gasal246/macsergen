"use client"
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { storeGenerateIdsForModuleModal } from '@/redux/slices/applicationSlice';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from '@/components/ui/switch';

const formSchema = z.object({
    module_id: z.string().min(2, {
        message: "Module name must be at least 2 characters.",
    }),
    count: z.string().min(1, {
        message: "Count must be at least 1.",
    }),
    isNew: z.boolean(),
})

const GenerateIDsForModuleDialog = ({ moduleId, module }: { moduleId: string, module: any }) => {
    const { generateIdsForModuleModal } = useSelector((state: RootState) => state.application);
    const dispatch = useDispatch<AppDispatch>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            module_id: moduleId,
            count: "",
            isNew: true,
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    const handleCloseDialog = () => {
        dispatch(storeGenerateIdsForModuleModal(false));
    }

    return (
        <Dialog open={generateIdsForModuleModal} onOpenChange={handleCloseDialog}>
            <DialogContent className='bg-zinc-800/30 backdrop-blur-sm min-w-[50%]'>
                <DialogHeader>
                    <DialogTitle className='text-white'>Generate IDs</DialogTitle>
                    <DialogDescription className='text-neutral-300 font-medium'>Generate MacIds and Serial Numbers for {module?.model_number}, {module?.description}.</DialogDescription>
                </DialogHeader>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="count"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-white'>Enter Count</FormLabel>
                                        <FormControl className='w-full lg:w-[50%]'>
                                            <Input placeholder="No. of IDs Required" type="number" className='text-white' {...field} />
                                        </FormControl>
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
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default GenerateIDsForModuleDialog