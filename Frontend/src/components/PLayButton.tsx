import type { Song } from "@/interfaces/song"
import usePlayerStore from "@/store/usePlayerStore"
import { Button } from "./ui/button";
import { PauseIcon, PlayIcon } from "lucide-react";
import { useClerk } from "@clerk/react";


const PLayButton = ({song}:{song:Song}) => {

    const {currentSong,isPlaying,setCurrentSong,tooglePlay} = usePlayerStore();

    const {openSignIn,isSignedIn} = useClerk();

    const isCurrentSong = currentSong?._id === song._id;

    const handlePlay = () => {
        if(!isSignedIn){
            openSignIn();
            return;
        }
        if(isCurrentSong){
            tooglePlay();
        }else{
            setCurrentSong(song);
        }
    }

  return (
    <Button onClick={handlePlay}
    className={`absolute bottom-0 right-2 bg-green-500 hover:bg-green-400 hover:scale-105 transition-all translate-y-2 group-hover:translate-y-0  ${isCurrentSong ? "opacity-100":"opacity-0 group-hover:opacity-100"} 
        `}
    >
        {
            isCurrentSong && isPlaying ? 
            (<PauseIcon className="size-4 text-black font-medium"/>)
            :
            (<PlayIcon className="size-4 text-black font-medium"/>)
        }
      
    </Button>
  )
}

export default PLayButton
