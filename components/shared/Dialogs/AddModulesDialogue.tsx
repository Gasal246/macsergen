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
import { storeModuleModal } from '@/redux/slices/applicationSlice';
import { toast } from 'sonner';

const formSchema = z.object({
  module_name: z.string().min(2, {
    message: "Module name must be at least 2 characters.",
  }),
  module_suffix: z.string().min(3, {
    message: "Module Suffix must be at least 3 characters."
  })
})
const AddModulesDialogue = ({ getModulesFunction }: { getModulesFunction: () => void }) => {
  const { isEdit, moduleName, moduleSuffix, moduleId, moduleModal } = useSelector((state: RootState) => state.application);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      module_name: moduleName,
      module_suffix: moduleSuffix,
    },
  })

  useEffect(() => {
    if (isEdit) {
      form.setValue("module_name", moduleName);
      form.setValue("module_suffix", moduleSuffix);
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
          module_name: values.module_name,
          suffix: values.module_suffix
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
      <DialogContent className='bg-zinc-800/30 backdrop-blur-sm lg:min-w-[50%]'>
        <DialogHeader>
          <DialogTitle className='text-white'>{isEdit ? "Edit" : "Add"} Module</DialogTitle>
          <DialogDescription>Please {isEdit ? "fill" : "update"} the form below to {isEdit ? "edit" : "add"} {isEdit ? "this" : "a new"} module.</DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="module_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Module Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Module Name" className='text-white' {...field} />
                    </FormControl>
                    <FormDescription className='text-neutral-400 text-xs font-semibold'>
                      Module name is used to identify the module in the system.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="module_suffix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Module Suffix</FormLabel>
                    <FormControl>
                      <Input placeholder="Module Suffix" className='text-white' {...field} />
                    </FormControl>
                    <FormDescription className='text-neutral-400 text-xs font-semibold'>
                      Module suffix is used to generate serial numbers, and it is also used to identify the module.
                    </FormDescription>
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
