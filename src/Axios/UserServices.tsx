import axios from './AxiosInstance'

function UserServices() {
    const services =()=>{
        return{
            addUser: async(data: object)=>{
                return await axios.post('/RegisteredUsers',data)
            },  
        };
    };

  return services;
}

export default UserServices;

