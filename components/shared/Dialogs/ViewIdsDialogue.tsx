"use client"
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ViewIdsDialogue = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='bg-zinc-800/80 backdrop-blur-sm min-w-[60%]'>
        <DialogHeader>
          <DialogTitle className='text-white'>Generated IDs</DialogTitle>
          <DialogDescription>Dispalying generated IDs for this module.</DialogDescription>
        </DialogHeader>
        <div>
          
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ViewIdsDialogue