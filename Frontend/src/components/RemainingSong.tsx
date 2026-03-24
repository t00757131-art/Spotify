import type { Song } from "@/interfaces/song"
import { Button } from "./ui/button"
import { ChevronRightIcon } from "lucide-react"
import RemainingSongSkeleton from "./skeletons/RemainingSongSkeleton"
import PLayButton from "./PLayButton"


const RemainingSong = ({title,songs,isLoading}:{title:string,songs:Song[],isLoading:boolean}) => {
    if(isLoading){
     <RemainingSongSkeleton/>
    }
  return (
    <div className="w-full overflow-hidden ">
        <div className="flex items-center justify-between mb-6">
           <h2 className="font-medium text-white text-lg lg:text-xl">{title}</h2>
           <Button size={'default'} variant={'outline'} className="flex items-center">
            <span>Show all</span>
            <ChevronRightIcon className="size-4 "/>
           </Button>
        </div>
       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {
                songs?.map((song)=>(
                    <div key={song._id}
                     className="bg-zinc-800/40 rounded-md cursor-pointer p-4 group hover:bg-zinc-700/40 transition-all"
                    >
                      
                      <div className="relative mb-4">

                        <div className="aspect-square shadow-xl">

                            <img
                                src={song.imageUrl}
                                alt={song.audioUrl}
                                className="object-cover rounded-md  w-full h-full transition-transform group-hover:scale-105"
                            />

                        </div>

                        {/* todo : add play button  */}

                        <PLayButton song={song}/>

                      </div>

                      <div className="mt-3">
                         <h3 className="font-medium text-white  truncate">
                           {song.title}
                         </h3>
                        <p className="text-sm text-zinc-400 truncate">
                            {song.artist}
                        </p>
                      </div>

                     
                    </div>
                ))
            }

        </div>

      
    </div>
  )
}

export default RemainingSong
