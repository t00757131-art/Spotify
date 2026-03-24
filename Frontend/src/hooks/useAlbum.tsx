import type { Album, AlbumsWithSongInfo } from "@/interfaces/album"
import axiosInstance from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"



export const useGetAllAlbums = ()=>{
    const {data, isLoading, error} = useQuery({
        queryKey: ['get-albums'],
        queryFn: async() => {
            const res = await axiosInstance.get('/albums')

            return res.data.albums as Album[];
        },
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry:3
    })
    return {
        data,
         isLoading,
        error
    }
}

export const useGetAlbumById = (id: string) => {

    const {data,isLoading,error} = useQuery({
        queryKey: ['get-album-by-id', id],
        queryFn: async() => {
            const res = await axiosInstance.get(`/albums/${id}`)

            return res.data.album as AlbumsWithSongInfo;
        },
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry:3

    })

    return {
        album: data ,
        albumLoading: isLoading,
        error
    }
}