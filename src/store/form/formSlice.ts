import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import has from "lodash/hasIn";

import { TFieldNames } from "../../types";
import validator from "../../components/helpers/validator";

interface IInitialState {
  data: any;
  listRequiredFields: { fieldName: string; msg: string; isInvalid: boolean }[];
  isLoading: boolean;
}

const initialState: IInitialState = {
  data: {
    name: {
      value: "",
    },
    email: {
      value: "",
    },
    linkToProfile: {
      value: "",
    },
    org: {
      value: "",
    },
    recipient: {
      value: "",
    },
    tel: {
      value: "",
    },
    city: {
      value: "",
    },
    source: {
      value: "",
    },
  },
  listRequiredFields: [
    { fieldName: "name", msg: "Обязательное поле", isInvalid: true },
    { fieldName: "email", msg: "Обязательное поле", isInvalid: true },
    { fieldName: "city", msg: "Обязательное поле", isInvalid: true },
    { fieldName: "tel", msg: "Обязательное поле", isInvalid: true },
    { fieldName: "linkToProfile", msg: "Обязательное поле", isInvalid: true },
  ],
  isLoading: false,
};

export const submitData = createAsyncThunk("form/submitData", async () => {
  return new Promise<null>((res) => setTimeout(() => res(null), 2000));
});

export const formSlice = createSlice({
  name: "form",
  initialState: initialState,
  reducers: {
    setData: (
      state,
      action: PayloadAction<{ fieldName: TFieldNames; value: string; defaultValue?: string }>,
    ) => {
      const { fieldName, value } = action.payload;
      state.data[fieldName].value = value;
    },
    checkRequiredField: (
      state,
      action: PayloadAction<{ fieldName: TFieldNames; defaultValue?: string }>,
    ) => {
      const { fieldName, defaultValue } = action.payload;
      const value = state.data[fieldName].value;
      const check = defaultValue
        ? validator(fieldName, value, defaultValue)
        : validator(fieldName, value);
      const msg = check?.msg;
      const isInvalid = check?.isInvalid;
      const listRequiredFields = state.listRequiredFields;

      if (!check?.isInvalid) {
        const findItemIndex = listRequiredFields.findIndex((item) => item.fieldName === fieldName);
        if (findItemIndex > -1) {
          listRequiredFields.splice(findItemIndex, 1);
        }
      } else {
        const findItemIndex = listRequiredFields.findIndex((item) => item.fieldName === fieldName);
        const updateInfoError = { fieldName, msg: msg!, isInvalid: isInvalid! };
        if (findItemIndex === -1) {
          listRequiredFields.push(updateInfoError);
        } else {
          listRequiredFields[findItemIndex] = updateInfoError;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(submitData.fulfilled, (state) => {
      state.isLoading = false;
      console.log(JSON.stringify(state.data, null, 4));
      for (const key of Object.keys(state.data)) {
        state.data[key].value = "";
      }
      state.listRequiredFields = [
        { fieldName: "name", msg: "Обязательное поле", isInvalid: true },
        { fieldName: "email", msg: "Обязательное поле", isInvalid: true },
        { fieldName: "city", msg: "Обязательное поле", isInvalid: true },
        { fieldName: "tel", msg: "Обязательное поле", isInvalid: true },
        { fieldName: "linkToProfile", msg: "Обязательное поле", isInvalid: true },
      ];
    });
  },
});

export const { setData, checkRequiredField } = formSlice.actions;

export default formSlice.reducer;
