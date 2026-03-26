import FeaturedSongs from "@/components/FeaturedSongs"
import RemainingSong from "@/components/RemainingSong"
import TopNavbar from "@/components/TopNavbar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useGetSpecificSongs } from "@/hooks/useSongs"
import usePlayerStore from "@/store/usePlayerStore"
import { useUser } from "@clerk/react"
import { useEffect, useState } from "react"



const HomePage = () => {

  const {user} = useUser();

  const getGreeting = ()=>{
    const hours = new Date().getHours();

    if(hours>=4 && hours<12){
       return "Good morning";
    }else if(hours>=12 && hours<17){
       return "Good afternoon";
    }else{
       return "Good evening";
    }
  }

  const [greetings,setGreetings] = useState(getGreeting());


  const {songs:madeForYouSongs,isLoading:isLoadingMadeForYou} = useGetSpecificSongs(4,'made-for-you');

  const {songs:trendingSongs,isLoading:isLoadingTrending} = useGetSpecificSongs(4,'trending');

  const {songs:featuredSongs,isLoading:isLoadingFeatured} = useGetSpecificSongs(6,'featured');

  const {initializeQueue} = usePlayerStore()

  useEffect(()=>{
    const interval = setInterval(()=>{
      setGreetings(getGreeting());
    },60000)

    return ()=>clearInterval(interval);
  },[greetings])

  useEffect(()=>{

    const allSongs = [
      ...(featuredSongs || []),
      ...(trendingSongs || []),
      ...(madeForYouSongs || [])
    ];

    const uniqueSongs = Array.from(
      new Map(allSongs.map(song => [song._id, song])).values()
    )
    if(uniqueSongs.length>0){
      initializeQueue(uniqueSongs);
    }

  },[featuredSongs, initializeQueue, madeForYouSongs, trendingSongs])
 
 
  return (
    <div className="rounded-md overflow-hidden">
     <TopNavbar/>
   
     <ScrollArea className="h-[calc(100vh-180px)]">

       <div className="p-4 md:p-6 bg-linear-to-b space-y-18 from-zinc-700/70 via-zinc-800/60 to-zinc-900">
         
         <div >

          <h1 className="font-medium mb-8 text-lg lg:text-xl text-white wrap-break-word">{greetings} {`, ${user?.firstName || ""} ${user?.lastName || ""}`}</h1>

          <FeaturedSongs songs={featuredSongs!} isLoading={isLoadingFeatured}/>

         </div>

         <div className="space-y-20">

          {/* made for you section  */}
           <RemainingSong title="Made for you" songs={madeForYouSongs!} isLoading={isLoadingMadeForYou}/>
           <RemainingSong title="Trending" songs={trendingSongs!} isLoading={isLoadingTrending}/>

         </div>

       </div>

     </ScrollArea>

    
    </div>
  )
}

export default HomePage
