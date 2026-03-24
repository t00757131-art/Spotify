import type { User } from "@/interfaces/user";
import axiosInstance from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

 export const useGetAllUsers = ()=>{

    const  {data,isLoading} = useQuery({
        queryKey:["users"],
        queryFn:async()=>{

            const res = await axiosInstance.get("/users");

            return res.data.users as User[];
        }
    })

    return{ users:data,isLoading}
 }
 