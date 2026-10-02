import { createSlice } from "@reduxjs/toolkit";


const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    currentProject: null,
    starredProjects : [],
  },
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    addNewProject: (state, action) => {
      state.projects.unshift(action.payload);
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
    setStarredProjects: (state, action) => {
      state.starredProjects = action.payload;
    },
  },
});

export const { setProjects, setCurrentProject ,addNewProject, setStarredProjects } = projectSlice.actions;
export default projectSlice.reducer;

