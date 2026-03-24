import type { Song } from "./song";

export interface Album {
    _id: string;
    title: string;
    artist: string;
    imageUrl: string;
    releaseYear: string;
    songs: string[];
    imageId?: string
}

export interface AlbumsWithSongInfo{
    _id: string;
    title: string;
    artist: string;
    imageUrl: string;
    releaseYear: string;
    songs: Song[];
    imageId?: string
}