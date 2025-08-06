import ViewModule from '@/components/shared/ViewModule';
import React from 'react'

export default function ModulePage({ params }: any) {
  return <ViewModule id={params.id} />;
}

export const dynamic = 'force-dynamic'
