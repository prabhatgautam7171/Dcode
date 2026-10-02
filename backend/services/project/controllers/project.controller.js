import redis from "../../../shared/redis/redis.js";
import { Project } from "../models/project.model.js";



export const createProject = async (req,res) => {
  try {
     const userId = req.headers['X-User-Id'] || req.headers['x-user-id'];

     console.log("userId :", userId);

     if(!userId) {
      return res.status(400).json({ message: "User ID is required in the request headers." });
     }

     const { name, description } = req.body;

     if(!name || !description) {
      return res.status(400).json({ message: "Name and description are required." });
     }

      // Here you would typically save the project to your database

      const project =await Project.create({ name, description, owner: userId });

      const key = `projects:${userId}`;

      // Invalidate the cache for this user's projects
      await redis.del(key);

      return res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    console.log(error.message);
      return res.status(500).json({ message: "An error occurred while creating the project", error: error.message });
  }
}

export const getProjects = async (req,res) => {
  try {
    console.log("get project api hit ✅")
     const userId = req.headers['X-User-Id'] || req.headers['x-user-id'];

     console.log(userId);

     if(!userId) {
      return res.status(400).json({ message: "User ID is required in the request headers." });
     }

     const key = `projects:${userId}`;

     const cachedProjects = await redis.get(key);

     if (cachedProjects) {
         return res.status(200).json({ message: "Projects fetched successfully (from cache)", projects: JSON.parse(cachedProjects) });
     }

      // Here you would typically fetch the projects from your database

      const projects = await Project.find({ owner: userId }).sort({ lastOpenedAt: -1 });

     

      await redis.set(key, JSON.stringify(projects), 'EX', 3600); // Cache for 1 hour

      return res.status(200).json({ message: "Projects fetched successfully", projects });
  } catch (error) {
      return res.status(500).json({ message: "An error occurred while fetching projects", error: error.message });
  }
}

export const getProjectById = async (req,res) => {
  try {
     const userId = req.headers['X-User-Id'] || req.headers['x-user-id'];

     if(!userId) {
      return res.status(400).json({ message: "User ID is required in the request headers." });
     }

     const { projectId } = req.params;

     if(!projectId) {
      return res.status(400).json({ message: "Project ID is required in the request parameters." });
     }

      // Here you would typically fetch the project from your database

      const project = await Project.findOne({ _id: projectId, owner: userId });

      if(!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      return res.status(200).json({ message: "Project fetched successfully", project });
  } catch (error) {
      return res.status(500).json({ message: "An error occurred while fetching the project", error: error.message });
  }
}

export const editProject = async (req,res) => {
  try {
     const userId = req.headers['X-User-Id'] || req.headers['x-user-id'];

     if(!userId) {
      return res.status(400).json({ message: "User ID is required in the request headers." });
     }

     const { projectId } = req.params;

     if(!projectId) {
      return res.status(400).json({ message: "Project ID is required in the request parameters." });
     }

     const { name, description } = req.body;

     if(!name && !description) {
      return res.status(400).json({ message: "At least one of name or description is required to update." });
     }

      // Here you would typically update the project in your database

      const project = await Project.findOneAndUpdate(
        { _id: projectId, owner: userId },
        { $set: { name, description } },
        { new: true }
      );

      if(!project) {
        return res.status(404).json({ message: "Project not found or you do not have permission to edit it." });
      }

      return res.status(200).json({ message: "Project updated successfully", project });
  } catch (error) {
      return res.status(500).json({ message: "An error occurred while updating the project", error: error.message });
  }
}

export const deleteProject = async (req,res) => {
  try {
     const userId = req.headers['X-User-Id'] || req.headers['x-user-id'];

     if(!userId) {
      return res.status(400).json({ message: "User ID is required in the request headers." });
     }

     const { projectId } = req.params;

     if(!projectId) {
      return res.status(400).json({ message: "Project ID is required in the request parameters." });
     }

      // Here you would typically delete the project from your database

      const project = await Project.findOneAndDelete({ _id: projectId, owner: userId });

      if(!project) {
        return res.status(404).json({ message: "Project not found or you do not have permission to delete it." });
      }

      const key = `projects:${userId}`;

      // Invalidate the cache for this user's projects
      await redis.del(key);

      return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
      return res.status(500).json({ message: "An error occurred while deleting the project", error: error.message });
  }
}

export const toggleStar = async (req,res) => {
  try {
     const userId = req.headers['X-User-Id'] || req.headers['x-user-id'];

     if(!userId) {
      return res.status(400).json({ message: "User ID is required in the request headers." });
     }

     const { projectId } = req.params;

     if(!projectId) {
      return res.status(400).json({ message: "Project ID is required in the request parameters." });
     }

      // Here you would typically update the starred status of the project in your database

      const project = await Project.findOne({ _id: projectId, owner: userId });

      if(!project) {
        return res.status(404).json({ message: "Project not found or you do not have permission to star/unstar it." });
      }

      project.starred = !project.starred;  // Toggle the starred status
      await project.save();

      const key = `starredProjects:${userId}`;

      // Invalidate the cache for this user's projects
      await redis.del(key);

      return res.status(200).json({ message: `Project ${project.starred ? "starred" : "unstarred"} successfully`, project });
  } catch (error) {
      return res.status(500).json({ message: "An error occurred while updating the starred status of the project", error: error.message });
  }
}

export const getStarredProjects = async (req,res) => {
  try {
     const userId = req.headers['X-User-Id'] || req.headers['x-user-id'];

     if(!userId) {
      return res.status(400).json({ message: "User ID is required in the request headers." });
     }

     const key = `starredProjects:${userId}`;

     const cachedStarredProjects = await redis.get(key);

     if (cachedStarredProjects) {
         return res.status(200).json({ message: "Starred projects fetched successfully (from cache)", projects: JSON.parse(cachedStarredProjects) });
     }

      // Here you would typically fetch the starred projects from your database

      const projects = await Project.find({ owner: userId, starred: true }).sort({ lastOpenedAt: -1 });

      await redis.set(key, JSON.stringify(projects), 'EX', 3600); // Cache for 1 hour

      return res.status(200).json({ message: "Starred projects fetched successfully", projects });
  } catch (error) {
      return res.status(500).json({ message: "An error occurred while fetching starred projects", error: error.message });
  }
}

