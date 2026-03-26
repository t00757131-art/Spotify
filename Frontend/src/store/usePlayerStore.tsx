import type { Song } from "@/interfaces/song"
import { create } from "zustand"

import type { Socket } from "socket.io-client"

interface playerStore {
  currentSong: Song | null
  isPlaying: boolean
  queue: Song[]
  currentIndex: number
  initializeQueue: (songs: Song[], index?: number) => void
  setIsPlaying: (isPlaying: boolean) => void

  PlayAlbum: (songs: Song[], index?: number,userId?:string,socket?:Socket) => void
  SetCurrentSong: (song: Song | null,userId?:string,socket?:Socket) => void

  TooglePlay: (userId?:string,socket?:Socket) => void
  PlayNext: (userId?:string,socket?:Socket) => void
  PlayPrevious: (userId?:string,socket?:Socket) => void
  shuffleQueue: () => void
  isLooping: boolean
  toggleLooping: () => void
  isMobile: boolean
  setIsMobile: (isMobile: boolean) => void
}

const usePlayerStore = create<playerStore>((set, get) => ({
  isMobile: false,
  setIsMobile: (isMobile) => set({ isMobile }),
  currentSong: null,
  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  queue: [],
  currentIndex: -1,
  initializeQueue: (songs: Song[]) => {
    set({
      queue: songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: get().currentIndex < 0 ? 0 : get().currentIndex,
    })
  },
  PlayAlbum: (songs: Song[], index = 0,userId,socket) => {

    if (songs.length === 0) return

    const song = songs[index]


    if (userId) {
      socket?.emit("update-activity", {
        userId,
        activity: `Playing ${song.title} by ${song.artist}`,
      })
    }

    set({
      queue: songs,
      currentSong: song,
      currentIndex: index,
      isPlaying: true,
    })
  },
  SetCurrentSong: (song: Song | null,userId?:string,socket?:Socket) => {
    if (!song) return

    if (userId) {
      socket?.emit("update-activity", {
        userId,
        activity: `Playing ${song.title} by ${song.artist}`,
      })
    }

    const songIndex = get().queue.findIndex((s) => s._id === song._id)

    set({
      currentSong: song,
      currentIndex: songIndex >= 0 ? songIndex : get().currentIndex,
      isPlaying: true,
    })
  },
  TooglePlay: (userId?:string,socket?:Socket) => {
    const startPlaying = !get().isPlaying

    const { currentSong } = get();

    if (userId) {
      socket?.emit("update-activity", {
        userId,
        activity: startPlaying && currentSong
          ? `Playing ${currentSong?.title} by ${currentSong?.artist}`
          : "Idle",
      })
    }

    set({ isPlaying: startPlaying })
  },
  PlayNext: (userId?:string,socket?:Socket) => {
    const { currentIndex, queue } = get()
    const nextIndex = (currentIndex + 1) % queue.length //due to this songs will play in a loop

    const nextSong = queue[nextIndex];

       if(userId){
        socket?.emit("update-activity",{
                userId,
                activity:`Playing ${nextSong.title} by ${nextSong.artist}`
        })
       }

    set({
      currentSong: nextSong,
      currentIndex: nextIndex,
      isPlaying: true,
    })
  },
  PlayPrevious: (userId?:string,socket?:Socket) => {
    const { currentIndex, queue } = get()
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length //due to this songs will play in a loop

    const prevSong = queue[prevIndex];

       if(userId){
        socket?.emit("update-activity",{
                userId,
                activity:`Playing ${prevSong.title} by ${prevSong.artist}`
        })
       }

    set({
      currentSong: prevSong,
      currentIndex: prevIndex,
      isPlaying: true,
    })
  },
  shuffleQueue: () => {
    const { queue } = get()

    const shuffled = [...queue]

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    const randomIndex = Math.floor(Math.random() * shuffled.length)
    const randomSong = shuffled[randomIndex]

    set({
      queue: shuffled,
      currentSong: randomSong,
      currentIndex: randomIndex,
    })
  },
  isLooping: false,
  toggleLooping: () => set({ isLooping: !get().isLooping }),
}))

export default usePlayerStore
