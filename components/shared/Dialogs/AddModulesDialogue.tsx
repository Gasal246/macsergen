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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  modal_number: z.string().min(2, {
    message: "Module name must be at least 2 characters.",
  }),
  telx_model_number: z.string().min(2, {
    message: "Telx Module name must be at least 2 characters."
  }),
  suffix: z.string().optional(),
  description: z.string().min(3, {
    message: "Module Description must be at least 3 characters."
  }),
  qty: z.number().min(1, {
    message: "Module Qty must be at least 1."
  }),
  chipset: z.string().min(3, {
    message: "Module Chipset must be at least 3 characters."
  }),
  ap_type: z.string().min(3, {
    message: "Module AP Type must be at least 3 characters."
  })
})
const AddModulesDialogue = ({ getModulesFunction }: { getModulesFunction: () => void }) => {
  const { isEdit, modelNumber, suffix, description, qty, chipset, ap_type, moduleId, moduleModal, telxModelNumber } = useSelector((state: RootState) => state.application);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      modal_number: modelNumber,
      telx_model_number: telxModelNumber,
      suffix: suffix,
      description: description,
      qty: qty,
      chipset: chipset,
      ap_type: ap_type,
    },
  })

  useEffect(() => {
    if (isEdit) {
      form.setValue("modal_number", modelNumber);
      form.setValue("suffix", suffix);
      form.setValue("description", description);
      form.setValue("qty", qty);
      form.setValue("chipset", chipset);
      form.setValue("ap_type", ap_type);
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
          model_number: values.modal_number,
          telx_model_number: values.telx_model_number,
          suffix: values.suffix,
          description: values.description,
          qty: values.qty,
          chipset: values.chipset,
          ap_type: values.ap_type
        });
        if (res?.status === 200) {
          toast.success("Module updated successfully");
          getModulesFunction();
        }
        dispatch(storeModuleModal(false))
        return
      }
      const res = await axios.post('/api/module/add', values);
      if (res?.status === 200) {
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
      <DialogContent className='bg-zinc-800/30 backdrop-blur-sm min-w-[50%] lg:min-w-[35%] max-h-[80%] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-white'>{isEdit ? "Edit" : "Add"} Module</DialogTitle>
          <DialogDescription>Please {isEdit ? "fill" : "update"} the form below to {isEdit ? "edit" : "add"} {isEdit ? "this" : "a new"} module.</DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="modal_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Model Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Model Number" className='text-white' {...field} />
                    </FormControl>
                    <FormDescription className='text-neutral-400 text-xs font-semibold'>
                      Model number is used to identify the module in the system.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telx_model_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Telx Model Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Telx Model Number" className='text-white' {...field} />
                    </FormControl>
                    <FormDescription className='text-neutral-400 text-xs font-semibold'>
                      Model number assigned by TelX.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="suffix"
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
              /> */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Module Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Module Description" className='text-white' {...field} />
                    </FormControl>
                    <FormDescription className='text-neutral-400 text-xs font-semibold'>
                      Module description is used to describe the module in the system.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="qty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Module Qty</FormLabel>
                    <FormControl>
                      <Input placeholder="Module Qty" className='text-white' type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormDescription className='text-neutral-400 text-xs font-semibold'>
                      Module qty is used to know the existing quantity of the module.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="chipset"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Module Chipset</FormLabel>
                    <FormControl>
                      <Input placeholder="Module Chipset" className='text-white' {...field} />
                    </FormControl>
                    <FormDescription className='text-neutral-400 text-xs font-semibold'>
                      Module chipset is used to identify the chipset of the module.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ap_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-white'>Select Module Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl className='w-full lg:w-[50%] text-white'>
                        <SelectTrigger>
                          <SelectValue placeholder="Select AP Type" className='text-white' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="indoor">Indoor</SelectItem>
                        <SelectItem value="outdoor">Outdoor</SelectItem>
                      </SelectContent>
                    </Select>
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
