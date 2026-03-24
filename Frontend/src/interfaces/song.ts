export interface Song{
    _id: string;
    title: string;
    artist: string;
    imageUrl: string;
    audioUrl: string;
    imageId?: string;
    audioId?: string;
    duration:number,
    albumId?: string;
    createdAt:string
}