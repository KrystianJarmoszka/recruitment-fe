import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProperties } from "../../api";
import { PropertiesState } from "../../interfaces/Property";
import {JobsState} from "../../interfaces/Job";

const initialState: PropertiesState = {
  items: [],
  status: 'idle',
  error: null,
  count: 0,
  page: 1,
  pages: 1
}

export const fetchProperties = createAsyncThunk('properties/fetchProperties', async (page: number) => {
  const response = await getProperties(page);
  return response?.data;
})

const PropertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProperties.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchProperties.fulfilled, (state, action) => {
      const { data, count, page, pages } = action.payload;

      state.status = 'succeeded'
      state.items = data
      state.count = count
      state.page = page
      state.pages = pages
    })
    builder.addCase(fetchProperties.rejected, (state) => {
      state.status = 'failed'
      state.error = 'Something went wrong'
    })
  }
})

export default PropertiesSlice.reducer;

export const selectAllProperties = (state: { properties: PropertiesState }) => state.properties.items;

