"use client"
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from 'axios'
import { toast } from 'sonner'
import { storeBulkAllocateModal } from '@/redux/slices/applicationSlice'

const formSchema = z.object({
    count: z.string().min(1, {
        message: "Count must be at least 2 characters.",
    }),
    moduleId: z.string().min(2, {
        message: "Module ID must be at least 2 characters.",
    })
});

const BulkAllocationDialogue = ({ moduleId, getModulesFunction }: { moduleId: string, getModulesFunction: () => void }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);
    const { bulkAllocateModal } = useSelector((state: RootState) => state.application);

    const handleCloseDialoge = () => {
        dispatch(storeBulkAllocateModal(false))
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            count: "",
            moduleId: moduleId,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            const res = await axios.post(`/api/module/useids/bulkallocate`, values);
            if(res?.status === 200) {
                toast.success("IDs allocated successfully")
                handleCloseDialoge();
                getModulesFunction();
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={bulkAllocateModal} onOpenChange={handleCloseDialoge}>
            <DialogContent className='bg-zinc-800/30 backdrop-blur-sm min-w-[50%] lg:min-w-[30%]'>
                <DialogHeader>
                    <DialogTitle className='text-white'>Bulk Allocation</DialogTitle>
                    <DialogDescription className='text-neutral-400'>Give a number of IDs to allocate, so that it will be allocated bulkly to unallocated ones in ascending order.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="count"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-white'>Count</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Count Of IDs To Allocate" className='text-white' {...field} />
                                    </FormControl>
                                    <FormDescription className='text-neutral-400'>
                                        This works by finding the unallocated IDs in ascending order and allocating them to the module in bulk.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='cursor-pointer w-full'>Allocate {form.getValues().count} IDs</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default BulkAllocationDialogue