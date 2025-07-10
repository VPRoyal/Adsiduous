import { apiClient } from "@/utils/apiClient";
import endpoints from "@/constants/endpoints";

// ToDo: Need to upgrade this function to inclue Authorization token logic
const uploadFile= async(file: File, tags: string[] = [])=> {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("tags", JSON.stringify(tags))
    return apiClient({url:endpoints.UPLOAD, method:"POST",data:formData})    
  }

export default {uploadFile};