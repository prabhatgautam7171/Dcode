import Project from "../../../../frontend/src/components/Project";


export const createFolder = async (req, res) => {
  try {
     const userId = req.user._id;

     if (!userId) {
       return res.status(401).json({ message: "Unauthorized" });
     }
     const {projectId} = req.body;
     // Check if project exists
     const project = await Project.findById(projectId);

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      // Check if root folder already exists for the project
      const existingRootFolder = await File.findOne({ project: projectId, parent: null, type: "folder" , isDeleted: false});

      if (existingRootFolder) {
        return res.status(400).json({ message: "Root folder already exists for this project" });
      }

      // Create the root folder
      const folder = await File.create({
        owner: userId,
        name : project.name,
        project: projectId,
        parent: null,
        type: "folder",
      });

    res.status(201).json({ message: " Folder created successfully", folder });
  } catch (error) {
    console.error("Error creating folder:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const createFile = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, projectId, parentId, content, language } = req.body;

    // Check if project exists
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if parent folder exists (if parentId is provided)
    if (parentId) {
      const parentFolder = await File.findById(parentId);
      if (!parentFolder || parentFolder.type !== "folder") {
        return res.status(400).json({ message: "Invalid parent folder" });
      }
    }

    const extension = name.includes(".") ? name.split(".").pop() : "";

    // Create the file
    const file = await File.create({
      owner: userId,
      name,
      project: projectId,
      parent: parentId || null,
      type : "file",
      language: language || "plaintext",
      content: content || "",
      extension: extension || "",
      size : content ? Buffer.byteLength(content, "utf8") : 0,
    });

    res.status(201).json({ message: "File created successfully", file });
  } catch (error) {
    console.error("Error creating file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getFile = async (req,res) => {
  try {

  } catch (error) {
    
  }
}

export const updateFile = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { fileId } = req.params;
    const { name, content, language } = req.body;

    // Find the file
    const file = await File.findById(fileId);

    if (!file || file.type !== "file") {
      return res.status(404).json({ message: "File not found" });
    }

    // Update the file properties
    if (name) {
      file.name = name;
      file.extension = name.includes(".") ? name.split(".").pop() : "";
    }
    if (content !== undefined) {
      file.content = content;
      file.size = Buffer.byteLength(content, "utf8");
    }
    if (language) {
      file.language = language;
    }

    await file.save();

    res.status(200).json({ message: "File updated successfully", file });

  } catch (error) {
    console.error("Error updating file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const deleteFile = async (req,res) => {
  try {

  } catch (error) {

  }
}


