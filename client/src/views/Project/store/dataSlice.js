import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetProjects, apiGetProjectById } from 'services/ProjectService'

export const getProjects = createAsyncThunk(
  'projects/data/getProjects',
  async () => {
      const response = await apiGetProjects()
      console.log(response.data);
      return response.data
  }
)

export const getProjectById = createAsyncThunk(
  'projects/data/getProjectById',
  async (params) => {
      const response = await apiGetProjectById(params)
      return response.data
  }
)

const dataSlice = createSlice({
    name: 'projects/data',
    initialState: {
        loading: false,
        projectList: [],
        selectedProject: null,
    },
    reducers: {
      setSelectedProject: (state, action) => {
          state.selectedProject = action.payload
      }
    },
    extraReducers: {
      [getProjects.pending]: (state) => {
          state.loading = true
      },
      [getProjects.fulfilled]: (state, action) => {
          state.loading = false
          state.projectList = action.payload
          state.selectedProject = action.payload[0]
      },
      [getProjects.rejected]: (state) => {
          state.loading = false
      },
      [getProjectById.pending]: (state) => {
          state.loading = true
      },
      [getProjectById.fulfilled]: (state, action) => {
          state.loading = false
          state.projectList = action.payload
      },
      [getProjectById.rejected]: (state) => {
          state.loading = false
      },
    },
})

export const { setSelectedProject } = dataSlice.actions

export default dataSlice.reducer
