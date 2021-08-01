import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { Job, JobsState } from "../../interfaces/Job";
import { getJobs } from "../../api";

const initialState: JobsState = {
  items: [],
  status: 'idle',
  error: null
}

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const response = await getJobs();
  return response.data;
})

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchJobs.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.items = state.items.concat(action.payload)
    })
    builder.addCase(fetchJobs.rejected, (state) => {
      state.status = 'failed'
      state.error = 'Something went wrong'
    })
  }
})

export default jobsSlice.reducer;

export const selectAllJobs = (state: { jobs: JobsState }) => state.jobs.items;

