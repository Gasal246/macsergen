"use client"
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import axios from 'axios';
import { storeModuleModal } from '@/redux/slices/applicationSlice';
import { toast } from 'sonner';

const formSchema = z.object({
  module_name: z.string().min(2, {
    message: "Module name must be at least 2 characters.",
  }),
})
const AddModulesDialogue = ({ getModulesFunction }: { getModulesFunction: () => void }) => {
  const { isEdit, modelName, moduleId, moduleModal } = useSelector((state: RootState) => state.application);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      module_name: modelName,
    },
  })

  useEffect(() => {
    if (isEdit) {
      form.setValue("module_name", modelName)
    } else {
      form.reset()
    }
  }, [isEdit]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      if (isEdit) {
        const res = await axios.post(`/api/module/edit`, {
          moduleId,
          module_name: values.module_name
        });
        if(res?.status === 200) {
          toast.success("Module updated successfully");
          getModulesFunction();
        }
        dispatch(storeModuleModal(false))
        return
      }
      const res = await axios.post('/api/module/add', values);
      if(res?.status === 200) {
        toast.success("Module added successfully");
        getModulesFunction();
      }
      dispatch(storeModuleModal(false))
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  };

  return (
    <Dialog open={moduleModal} onOpenChange={() => dispatch(storeModuleModal(false))}>
      {/* <DialogTrigger asChild>{trigger}</DialogTrigger> */}
      <DialogContent className='bg-zinc-800/80 backdrop-blur-sm min-w-[60%]'>
        <DialogHeader>
          <DialogTitle className='text-white'>{isEdit ? "Edit" : "Add"} Module</DialogTitle>
          <DialogDescription>Please {isEdit ? "fill" : "update"} the form below to {isEdit ? "edit" : "add"} {isEdit ? "this" : "a new"} module.</DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="module_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Module Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Module Name" className='text-white' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='bg-gradient-to-br from-neutral-800 to-neutral-900 cursor-pointer border border-transparent hover:border-slate-500' type="submit">{isEdit ? "Update" : "Add"} Module</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddModulesDialogue;
