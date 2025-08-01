import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ApplicationState {
    modelName: string;
    isEdit: boolean;
    moduleId: string;
    moduleModal: boolean;
    generateIdsModal: boolean;
}

const initialState: ApplicationState = {
    modelName: "",
    isEdit: false,
    moduleId: "",
    moduleModal: false,
    generateIdsModal: false,
}

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        storeModelName: (state, action: PayloadAction<string>) => {
            state.modelName = action.payload;
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
    storeModelName,
    storeIsEdit,
    storeModuleId,
    storeModuleModal,
    storeGenerateIdsModal
} = applicationSlice.actions;

export default applicationSlice.reducer;
