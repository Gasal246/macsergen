import React from 'react'

const ModulePage = ({ params }: { params: { id: string }}) => {
  return (
    <div className='p-5'>
      <h1 className="text-white">id: {params?.id}</h1>
    </div>
  )
}

export default ModulePage
