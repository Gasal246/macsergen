import ViewModule from '@/components/shared/ViewModule'
import { redirect } from 'next/navigation'
import React from 'react'

const ModulePage = ({ params }: { params: { id: string }}) => {
  return (
    <ViewModule id={params.id} />
  )
}

export default ModulePage
