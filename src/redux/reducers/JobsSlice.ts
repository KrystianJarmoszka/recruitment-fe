import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import { JobFilterParams, JobsState } from '../../interfaces/Job';
import { getJobs } from '../../api';

const initialState: JobsState = {
  items: [],
  status: 'idle',
  error: null,
  count: 0,
  page: 1,
  pages: 1,
  keyWord: '',
  order: '1',
}

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (params: JobFilterParams | undefined) => {
  const response = await getJobs(params);
  return response.data;
})

const JobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setKeyWord(state: JobsState, action: PayloadAction<string>) {
      state.keyWord = action.payload;
    },
    setOrder(state: JobsState, action: PayloadAction<string>) {
      state.order = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJobs.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      const { data, count, page, pages } = action.payload;

      state.status = 'succeeded';
      state.items = data;
      state.count = count;
      state.page = page;
      state.pages = pages;
    })
    builder.addCase(fetchJobs.rejected, (state) => {
      state.status = 'failed'
      state.error = 'Something went wrong'
    })
  }
})

export default JobsSlice.reducer;
export const { setKeyWord, setOrder } = JobsSlice.actions

export const selectAllJobs = (state: { jobs: JobsState }) => state.jobs.items;

