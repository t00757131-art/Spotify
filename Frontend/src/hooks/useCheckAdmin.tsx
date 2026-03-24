import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface CheckAdminResponse {
    success:boolean
    isAdmin:boolean
}

const useCheckAdmin = ()=>{

    const {data,isLoading} =  useQuery({
    queryKey: ['checkAdmin'],
    queryFn:async()=>{
        const result = await axiosInstance.get('/admin/check-admin');

        return result.data as CheckAdminResponse
    },
    retry:2,
    refetchOnWindowFocus:false,
    refetchOnReconnect:false,
    staleTime:5 * 60 * 1000, //5 minutes
    })



    return {data,isLoading}
}   


export default useCheckAdmin;