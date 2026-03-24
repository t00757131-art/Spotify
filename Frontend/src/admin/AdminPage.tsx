import useCheckAdmin from "@/hooks/useCheckAdmin"
import { AlbumIcon, LoaderIcon, MusicIcon } from "lucide-react";
import { Navigate } from "react-router-dom";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SongsTabContent from "./components/SongsTabContent";
import AlbumTabContent from "./components/AlbumTabContent";
import { useGetAllAlbums } from "@/hooks/useAlbum";
import { useEffect } from "react";
import usePlayerStore from "@/store/usePlayerStore";
import { useAuth } from "@clerk/react";
import { useGetAllSongs } from "@/hooks/useAdmin";
import useMusicStore from "@/store/useMusicStore";




const AdminPage = () => {

  const {data:adminData,isLoading} = useCheckAdmin();

  const {isSignedIn,isLoaded} = useAuth();
  const {setAlbums,setSongs} = useMusicStore();
  const {data:albumsData,isLoading:albumsLoading} = useGetAllAlbums();
  const {data:songsData,isLoading:songsLoading} = useGetAllSongs();

  const {isMobile,setIsMobile} = usePlayerStore();

  useEffect(()=>{
      const checkIsMobile = ()=>{
              setIsMobile(window.innerWidth < 768);
      }
  
      window.addEventListener('resize',checkIsMobile);
  
      return ()=>window.removeEventListener('resize',checkIsMobile);
      
  },[isMobile,setIsMobile])

  useEffect(()=>{
    if(albumsData?.length){
       setAlbums(albumsData);
    }
    if(songsData?.length){
      setSongs(songsData);
    }
  },[albumsData, setAlbums, setSongs, songsData])

  if(!isLoaded){
    return(
        <div className="w-full h-screen flex items-center justify-center">
            <LoaderIcon className="size-8 animate-spin text-primary"/>
        </div>
    )
  }

  if(!isSignedIn){
    return <Navigate to="/"/>
  }

  if(!adminData?.isAdmin){
    return <Navigate to="/"/>
  }

  if(isLoading || albumsLoading || songsLoading){
    return(
        <div className="w-full h-screen flex items-center justify-center">
            <LoaderIcon className="size-8 animate-spin text-primary"/>
        </div>
    )
  }

  return (
    <div className="w-full min-h-screen  bg-linear-to-b from-zinc-900 via-zinc-900/50 to-black ">

      {/* header  */}
      <Header/>

      <div className="w-full h-full p-6 md:p-8">

         {/* stats  */}
         <DashboardStats/>

         <Tabs defaultValue="songs" className="space-y-6">
            <TabsList className="px-2 py-5 gap-2">
              <TabsTrigger value="songs" className="p-4">
                <MusicIcon className=" size-4"/>
                Songs
              </TabsTrigger>
              <TabsTrigger value="albums" className="p-4">
                <AlbumIcon className=" size-4"/>
                Albums
              </TabsTrigger>
            </TabsList>

            <TabsContent value="songs">
                <SongsTabContent/>
            </TabsContent>
            <TabsContent value="albums">
                <AlbumTabContent/>
            </TabsContent>
         </Tabs>

      </div>

     
    </div>
  )
}

export default AdminPage
