import type {   statsResponse } from "@/interfaces/responses";
import type { Song } from "@/interfaces/song";
import axiosInstance from "@/lib/axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useGetAdminStats = ()=>{

    const {data,isLoading} = useQuery({
        queryKey:['adminStats'],
        queryFn:async()=>{

            const res = await axiosInstance.get('/stats');

            return res.data as statsResponse
        }
    })

    return {
        data,
        isLoading,
    }
}


export const useGetAllSongs = ()=>{

    const {data,isLoading} = useQuery({
        queryKey:['allSongs'],
        queryFn:async()=>{

            const res = await axiosInstance.get('/songs');

            return res.data.songs as Song[]
        }

    })
        
    return {
        data,
        isLoading,
    }
}

export const useDeleteSong = ()=>{
    const queryClient = useQueryClient();

   return useMutation({
        mutationKey:['deleteSong'],
        mutationFn:async(songId:string)=>{
            const res =  await axiosInstance.delete(`/admin/songs/${songId}`);
            return res.data;
        },
        onSuccess:()=>{
            toast.success("Song deleted successfully");
            queryClient.invalidateQueries({queryKey:['allSongs']});
        },
        onError:()=>{
            toast.error("Failed to delete song");

        },

    })
}   


export const useCreateSong = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey:['createSong'],
        mutationFn:async(song:FormData)=>{
            const res = await axiosInstance.post('/admin/songs',song,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return res.data;
        },
        onSuccess:()=>{
            toast.success("Song created successfully");
            queryClient.invalidateQueries({queryKey:['allSongs']});
        },
        onError:()=>{
            toast.error("Failed to create song");
        },
    })
}


export const useCreateAlbum = ()=>{

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey:['createAlbum'],
        mutationFn:async(album:FormData)=>{
            const res = await axiosInstance.post('/admin/albums',album,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return res.data;
        },
        onSuccess:()=>{
            toast.success("Album created successfully");
            queryClient.invalidateQueries({queryKey:['get-albums']});
        },
        onError:()=>{
            toast.error("Failed to create album");
        }
    })
}

export const useDeleteAlbum = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey:['deleteAlbum'],
        mutationFn:async(albumId:string)=>{
            console.log('api start')
            console.log(axiosInstance.defaults.baseURL)
            const res = await axiosInstance.delete(`/admin/albums/${albumId}`); 
            console.log('api end')
            return res.data;

        },
        onSuccess:()=>{
            toast.success("Album deleted successfully");
            queryClient.invalidateQueries({queryKey:['get-albums']});
        },
        onError:()=>{
            toast.error("Failed to delete album");
        }
    })
}



