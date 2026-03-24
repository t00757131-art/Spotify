
import type { Song } from "./song";
import type { Album } from "./album";

export interface statsResponse{
    success:boolean,
    message:string,
    totalSongs:number,
    totalAlbums:number,
    totalUsers:number,
    totalArtists:number,
}

export interface allSongsResponse{
    success:boolean,
    songs:Song[]
}

export interface allAlbumsResponse  {
    success:boolean,
    albums:Album[]
}
