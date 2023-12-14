import axios from "./AxiosInstance";

function UserServices() {
  const services = () => {
    return {
      addUser: async (data: object) => {
        return await axios.post("/RegisteredUsers", data);
      },
      getRegisteredUsers: async () => {
        return await axios.get("/RegisteredUsers");
      },
      getUploadedAudio: async () => {
        return await axios.get("/UploadedAudio");
      },
      addUploadedAudio: async (data: object) => {
        return await axios.post("/UploadedAudio", data);
      },
      deleteUploadedAudio: async (id: string) => {
        return await axios.delete(`/UploadedAudio/${id}`);
      },
      getAudio: async () => {
        return await axios.get("/Audios");
      }
      ,addAudio: async (data: object) => {
        return await axios.post("/Audios", data);
      },
    };
  };

  return services;
}

export default UserServices;
