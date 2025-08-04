"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { motion } from 'framer-motion'
import { ModuleDataTable } from './DataTables/ModuleDataTable'
import { moduleColumns } from './TableColumns/ModuleColumns';
import AddModulesDialogue from './Dialogs/AddModulesDialogue'
import { Provider, useDispatch } from 'react-redux';
import { AppDispatch, store } from '@/redux/store';
import { storeGenerateIdsModal, storeIsEdit, storeModuleName, storeModuleId, storeModuleModal, storeModuleSuffix } from '@/redux/slices/applicationSlice'
import axios from 'axios'
import LoaderSpin from './Utility/LoaderSpin'
import { GeneratedIdTable } from './DataTables/GenerateIdTable'
import { generateIdColumns } from './TableColumns/GenerateIdColumns'
import GenerateIDsDialogue from './Dialogs/GenerateIDsDialogue'

const AddModuleButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const hanldeOpenAddModuleModal = () => {
    dispatch(storeIsEdit(false))
    dispatch(storeModuleId(""))
    dispatch(storeModuleName(""))
    dispatch(storeModuleSuffix(""))
    dispatch(storeModuleModal(true))
  }
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className='bg-gradient-to-br from-neutral-800 to-neutral-900 px-4 py-2 rounded-lg cursor-pointer'
    >
      <h1 className="text-sm font-semibold text-white" onClick={hanldeOpenAddModuleModal}>Add Module</h1>
    </motion.div>
  )
}

const GenerateIdsButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleOpenGenerateIdsModal = () => {
    dispatch(storeGenerateIdsModal(true));
  };
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className='bg-gradient-to-br from-neutral-800 to-neutral-900 px-4 py-2 rounded-lg cursor-pointer'
    >
      <h1 className="text-sm font-semibold text-white" onClick={handleOpenGenerateIdsModal}>Generate IDs</h1>
    </motion.div>
  )
}

const MainTab = () => {
  const [value, setValue] = useState("modules");
  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState<any[]>([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/module/get/all');
      setModules(res.data?.modules);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Provider store={store}>
      <AddModulesDialogue getModulesFunction={getList} />
      <GenerateIDsDialogue moduleList={modules} />
      <Tabs defaultValue={value} onValueChange={(value) => setValue(value)}>
        <TabsList className="grid w-full grid-cols-2 bg-gradient-to-br from-neutral-500 to-neutral-600 h-14">
          <TabsTrigger value="modules" className={`text-[16px] font-semibold text-white`}>Added Modules</TabsTrigger>
          <TabsTrigger value="generateds" className={`text-[16px] font-semibold text-white`}>Generated IDs</TabsTrigger>
        </TabsList>
        <TabsContent value="modules" className='bg-gradient-to-br from-neutral-400 to-neutral-600 min-h-[75dvh] p-4 rounded-lg pb-10 overflow-x-hidden overflow-y-scroll'>
          <div className='w-full p-4'>
            <div className="flex justify-between items-center">
              <h1 className="text-[16px] font-bold text-neutral-900 underline">Modules or Device Types</h1>
              <AddModuleButton />
            </div>
            <div className='mt-3'>
              {loading ? <div className='flex justify-center items-center h-[30dvh]'>
                <LoaderSpin size={70} title="Loading Modules..." />
              </div> : <ModuleDataTable columns={moduleColumns} data={modules} />}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="generateds" className='bg-gradient-to-br from-neutral-400 to-neutral-600 min-h-[75dvh] rounded-lg p-4 overflow-x-hidden overflow-y-scroll'>
        <div className='w-full p-4'>
            <div className="flex justify-between items-center">
              <h1 className="text-[16px] font-bold text-neutral-900 underline">Generated Ids For Modules</h1>
              <GenerateIdsButton />
            </div>
            <div className='mt-3'>
              <GeneratedIdTable columns={generateIdColumns} data={[]} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Provider>
  )
}

export default MainTab