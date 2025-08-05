"use client"
import { RootState } from '@/redux/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { storeDeleteModuleModal } from '@/redux/slices/applicationSlice'
import axios from "axios";
import { toast } from 'sonner'

const DeleteModuleComponent = ({ getModulesFunction }: { getModulesFunction: () => void }) => {
    const [loading, setLoading] = React.useState(false);
    const { deleteModuleModal, moduleId } = useSelector((state: RootState) => state.application);
    const dispatch = useDispatch<AppDispatch>();

    const handleCloseDialog = () => {
        dispatch(storeDeleteModuleModal(false));
    }
    
    const handleDeleteModule = async () => {
        setLoading(true);
        try {
            const res = await axios.post('/api/module/delete', { moduleId });
            if (res.data?.success) {
                toast.success("Module deleted successfully");
                handleCloseDialog();
                getModulesFunction();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

  return (
    <Dialog open={deleteModuleModal} onOpenChange={handleCloseDialog}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className='font-semibold'>Delete Module</DialogTitle>
                <DialogDescription className='text-neutral-700 font-medium'>
                    Kindly Informing You, This action may cause permenent loss of your previous data, ( includes generated IDs ) for this module. You may have to allocate new IDs if consider adding the module again.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <div className='flex items-center gap-2'>
                    <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
                    <Button variant="destructive" onClick={handleDeleteModule} disabled={loading}>Delete {loading && "..."}</Button>
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default DeleteModuleComponent
