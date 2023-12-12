import axios from './AxiosInstance'

function UserServices() {
    const services =()=>{
        return{
            addUser: async(data: object)=>{
                return await axios.post('/RegisteredUsers',data)
            },
             getRegisteredUsers: async () => {
                return await axios.get('/RegisteredUsers');
              }, 
              addSignedInUser: async (data: object) => {
                return await axios.post('/SignedInUsers', data);
              },
                getUploadedAudio: async () => {
                  return await axios.get('/UploadedAudio');
                },
                addUploadedAudio: async (data: object) => {
                  return await axios.post('/UploadedAudio', data);
                },
                deleteUploadedAudio: async (id: string) => {
                  return await axios.delete(`/UploadedAudio/${id}`);
                }
        };
    };

  return services;
}

export default UserServices;

