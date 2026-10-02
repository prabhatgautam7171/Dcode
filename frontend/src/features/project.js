import axios from "axios"


export const createProject = async (projectData) => {
   try {
       const response = await axios.post("http://localhost:8000/api/project/create", projectData, {
           withCredentials:true
       });

       return response;
   } catch (error) {
        console.log(error.message);

   }
}

export const getProjects = async () => {
   try {
       const response = await axios.get("http://localhost:8000/api/project/get", {
           withCredentials:true
       });

       return response;
   } catch (error) {
      console.log(error.message);
   }
}

export const getProjectById = async (req, res) => {
   try {
       const response = await axios.get(`http://localhost:8002/api/project/get/${req.params.projectId}`, {
           headers: {
               "X-User-Id": req.user?._id.toString(),
           },
       });

       res.status(response.status).json(response.data);
   } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
   }
}

export const editProject = async (req, res) => {
   try {
       const response = await axios.put(`http://localhost:8002/api/project/edit/${req.params.projectId}`, req.body, {
           headers: {
               "X-User-Id": req.user?._id.toString(),
           },
       });

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
    }
}

export const deleteProject = async (req, res) => {
   try {
       const response = await axios.delete(`http://localhost:8002/api/project/delete/${req.params.projectId}`, {
           headers: {
               "X-User-Id": req.user?._id.toString(),
           },
       });

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
    }
}

export const toggleStar = async (req, res) => {
   try {
       const response = await axios.post(`http://localhost:8002/api/project/starOrUnstar/${req.params.projectId}`, {}, {
           headers: {
               "X-User-Id": req.user?._id.toString(),
           },
       });

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
    }
}

export const getStarredProjects = async (req, res) => {
   try {
       const response = await axios.get("http://localhost:8002/api/project/starred", {
           headers: {
               "X-User-Id": req.user?._id.toString(),
           },
       });

       res.status(response.status).json(response.data);
   } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
   }
}
