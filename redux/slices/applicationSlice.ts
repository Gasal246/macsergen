import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ApplicationState {
    moduleName: string;
    moduleSuffix: string;
    isEdit: boolean;
    moduleId: string;
    moduleModal: boolean;
    generateIdsModal: boolean;
}

const initialState: ApplicationState = {
    moduleName: "",
    moduleSuffix: "",
    isEdit: false,
    moduleId: "",
    moduleModal: false,
    generateIdsModal: false,
}

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        storeModuleName: (state, action: PayloadAction<string>) => {
            state.moduleName = action.payload;
        },
        storeModuleSuffix: (state, action: PayloadAction<string>) => {
            state.moduleSuffix = action.payload;
        },
        storeIsEdit: (state, action: PayloadAction<boolean>) => {
            state.isEdit = action.payload;
        },
        storeModuleId: (state, action: PayloadAction<string>) => {
            state.moduleId = action.payload;
        },
        storeGenerateIdsModal: (state, action: PayloadAction<boolean>) => {
            state.generateIdsModal = action.payload;
        },
        storeModuleModal: (state, action: PayloadAction<boolean>) => {
            state.moduleModal = action.payload;
        }
    },
});

export const {
    storeModuleName,
    storeModuleSuffix,
    storeIsEdit,
    storeModuleId,
    storeModuleModal,
    storeGenerateIdsModal
} = applicationSlice.actions;

export default applicationSlice.reducer;
