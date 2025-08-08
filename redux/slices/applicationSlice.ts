import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ApplicationState {
    modelNumber: string;
    suffix: string;
    description: string;
    qty: number;
    chipset: string;
    ap_type: string;
    isEdit: boolean;
    moduleId: string;
    moduleModal: boolean;
    telxModelNumber: string;
    generateIdsModal: boolean;
    deleteModuleModal: boolean;
    generateIdsForModuleModal: boolean;
    bulkAllocateModal: boolean;
}

const initialState: ApplicationState = {
    modelNumber: "",
    suffix: "",
    description: "",
    qty: 0,
    chipset: "",
    ap_type: "",
    isEdit: false,
    moduleId: "",
    moduleModal: false,
    telxModelNumber: "",
    generateIdsModal: false,
    deleteModuleModal: false,
    generateIdsForModuleModal: false,
    bulkAllocateModal: false,
}

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        storeModelNumber: (state, action: PayloadAction<string>) => {
            state.modelNumber = action.payload;
        },
        storeSuffix: (state, action: PayloadAction<string>) => {
            state.suffix = action.payload;
        },
        storeDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        storeQty: (state, action: PayloadAction<number>) => {
            state.qty = action.payload;
        },
        storeChipset: (state, action: PayloadAction<string>) => {
            state.chipset = action.payload;
        },
        storeApType: (state, action: PayloadAction<string>) => {
            state.ap_type = action.payload;
        },
        storeIsEdit: (state, action: PayloadAction<boolean>) => {
            state.isEdit = action.payload;
        },
        storeModuleId: (state, action: PayloadAction<string>) => {
            state.moduleId = action.payload;
        },
        storeTelxModelNumber: (state, action: PayloadAction<string>) => {
            state.telxModelNumber = action.payload;
        },
        storeGenerateIdsModal: (state, action: PayloadAction<boolean>) => {
            state.generateIdsModal = action.payload;
        },
        storeModuleModal: (state, action: PayloadAction<boolean>) => {
            state.moduleModal = action.payload;
        },
        storeDeleteModuleModal: (state, action: PayloadAction<boolean>) => {
            state.deleteModuleModal = action.payload;
        },
        storeGenerateIdsForModuleModal: (state, action: PayloadAction<boolean>) => {
            state.generateIdsForModuleModal = action.payload;
        },
        storeBulkAllocateModal: (state, action: PayloadAction<boolean>) => {
            state.bulkAllocateModal = action.payload;
        }
    },
});

export const {
    storeModelNumber,
    storeSuffix,
    storeDescription,
    storeQty,
    storeChipset,
    storeApType,
    storeIsEdit,
    storeModuleId,
    storeTelxModelNumber,
    storeModuleModal,
    storeGenerateIdsModal,
    storeDeleteModuleModal,
    storeGenerateIdsForModuleModal,
    storeBulkAllocateModal
} = applicationSlice.actions;

export default applicationSlice.reducer;
