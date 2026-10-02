import express from "express";

import {
  createProject,
  deleteProject,
  editProject,
  getProjectById,
  getProjects,
  getStarredProjects,
  toggleStar,
} from "../controllers/project.controller.js";

const router = express.Router();

router.post("/create", createProject);

router.get("/get", getProjects);

router.get("/get/:projectId", getProjectById);

router.put("/edit/:projectId", editProject);

router.delete("/delete/:projectId", deleteProject);

router.post("/starOrUnstar/:projectId", toggleStar);

router.get("/starred", getStarredProjects);

export default router;
