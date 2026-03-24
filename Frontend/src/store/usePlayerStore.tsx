import type { Song } from "@/interfaces/song";
import {create} from "zustand";

interface playerStore{
    currentSong:Song | null,
    isPlaying:boolean,
    queue:Song[],
    currentIndex:number,
    initializeQueue:(songs:Song[],index?:number)=>void,
    setIsPlaying:(isPlaying:boolean)=>void,

    playAlbum:(songs:Song[],index?:number)=>void,
    setCurrentSong:(song:Song | null)=>void,

    tooglePlay:()=>void,
    playNext:()=>void,
    playPrevious:()=>void,
    shuffleQueue:()=>void,
    isLooping:boolean,
    toggleLooping:()=>void,
    isMobile:boolean,
    setIsMobile :(isMobile:boolean)=>void
}

const usePlayerStore = create<playerStore>((set,get)=>({

    isMobile:false,
    setIsMobile:(isMobile)=>set({isMobile}),
    currentSong:null,
    isPlaying:false,
    setIsPlaying:(isPlaying)=>set({isPlaying}),
    queue:[],
    currentIndex:-1,
    initializeQueue:(songs:Song[])=>{
        set({
            queue:songs,
            currentSong:get().currentSong || songs[0],
            currentIndex:get().currentIndex < 0 ? 0 : get().currentIndex,
        })
    },
    playAlbum:(songs:Song[],index=0)=>{
       if(songs.length === 0) return;

       set({
        queue:songs,
        currentSong:songs[index],
        currentIndex:index,
        isPlaying:true,
       })
    },
    setCurrentSong:(song:Song | null)=>{
      if(!song) return;

      const songIndex = get().queue.findIndex((s)=>s._id===song._id);

      set({
        currentSong:song,
        currentIndex:songIndex >= 0 ? songIndex : get().currentIndex,
        isPlaying:true,
      })
    },
    tooglePlay:()=>set({isPlaying:!get().isPlaying}),
    playNext:()=>{

        const {currentIndex,queue} = get();
        const nextIndex = (currentIndex + 1) % queue.length; //due to this songs will play in a loop

        set({
            currentSong:queue[nextIndex],
            currentIndex:nextIndex,
            isPlaying:true,
        })
    },
    playPrevious:()=>{
        const {currentIndex,queue} = get();
        const prevIndex = (currentIndex - 1 + queue.length) % queue.length; //due to this songs will play in a loop

        set({
            currentSong:queue[prevIndex],
            currentIndex:prevIndex,
            isPlaying:true,
        })
    },
    shuffleQueue:()=>{
        const {queue} = get();

       const shuffled = [...queue];

        for(let i=shuffled.length-1;i>0;i--){
            const j = Math.floor(Math.random()*(i+1));
            [shuffled[i],shuffled[j]] = [shuffled[j],shuffled[i]];
        }

        const randomIndex = Math.floor(Math.random()*shuffled.length);
        const randomSong = shuffled[randomIndex];

        set({
            queue:shuffled,
            currentSong:randomSong,
            currentIndex:randomIndex,
        })
    },
    isLooping:false,
    toggleLooping:()=>set({isLooping:!get().isLooping}),

}))

export default usePlayerStore;