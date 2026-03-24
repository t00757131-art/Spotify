
import type { Album, AlbumsWithSongInfo } from '@/interfaces/album';
import type { Song } from '@/interfaces/song';
import { create } from 'zustand'

interface MusicState{
    albums: Album[];
    album:AlbumsWithSongInfo | null,
    setAlbum:(album:AlbumsWithSongInfo)=>void,
    setAlbums: (albums: Album[]) => void,
    songs: Song[],
    setSongs: (songs: Song[]) => void,
    
}

const useMusicStore = create<MusicState>((set) => ({
   songs:[],
   albums:[],
   setAlbums: (albums: Album[]) => set({ albums: albums }),
   setSongs: (songs: Song[]) => set({ songs: songs }),
   album:null,
   setAlbum: (album: AlbumsWithSongInfo) => set({ album: album }),

}))
 

export default useMusicStore
