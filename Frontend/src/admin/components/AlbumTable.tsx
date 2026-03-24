import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteAlbum } from "@/hooks/useAdmin";
import useMusicStore from "@/store/useMusicStore";
import usePlayerStore from "@/store/usePlayerStore";
import { CalendarIcon, Loader2Icon, MusicIcon, Trash2Icon } from "lucide-react";


const AlbumTable = () => {
    const {albums} = useMusicStore();
    
    const {isMobile} = usePlayerStore();

    const {mutate:deleteAlbum,isPending,variables} = useDeleteAlbum();

    const handleDelete = (albumId:string)=>{
        console.log("Deleting :",albumId);
        deleteAlbum(albumId);
    }

  return (
    <Table>
        <TableHeader>
            <TableRow className="hover:bg-zinc-800/50 transition-colors">
            <TableHead className={isMobile ? "w-0":"w-20"}></TableHead>
            <TableHead>Title</TableHead>   
            <TableHead>Artist</TableHead>   
            <TableHead>Release Year</TableHead>   
            <TableHead>Songs</TableHead>   
            <TableHead>Actions</TableHead>   
            </TableRow>
        </TableHeader>

        <TableBody>
            {
              albums?.map((album)=>(
                <TableRow key={album._id}>
                    <TableCell className={isMobile ? "w-0":"w-20"}>
                        <img src={album.imageUrl} alt={album.title} className="size-10 rounded-md object-cover"/>
                    </TableCell>
                    <TableCell className="font-medium">{album.title}</TableCell>   
                    <TableCell>{album.artist}</TableCell>   
                    <TableCell>
                        <div className="flex items-center gap-1 text-zinc-400">
                            <CalendarIcon className="size-4"/>
                            <span>{album.releaseYear}</span>
                        </div>
                    </TableCell>   
                    <TableCell>
                        <div className="flex items-center gap-1.5 text-zinc-400">
                            <MusicIcon className="size-4 text-emerald-400"/>
                            <span>{album.songs.length}</span>
                        </div>
                    </TableCell>   
                    <TableCell className="text-right">
                        <div className="flex items-center gap-2">
                            <AlertDialog>
                             <AlertDialogTrigger asChild>
                                <Button
                                    size={isMobile ? "icon":'icon-lg'}
                                    variant={'ghost'}
                                    aria-label="Delete album"
                                    disabled={variables === album._id && isPending}
                                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                >
                                    {
                                        variables === album._id && isPending ? <Loader2Icon className="size-4 animate-spin"/>
                                        :
                                        <Trash2Icon className="size-4"/>
                                    }
                                    

                                </Button>
                             </AlertDialogTrigger>
                             <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you sure to delete the album ? 
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This song will be permanently deleted
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                         Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction onClick={()=>handleDelete(album._id)}>   
                                       
                                                Delete album
                                        
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                             </AlertDialogContent>
                           </AlertDialog>
                        </div>
                        
                    </TableCell>   
                </TableRow>
              ))  
            }
        </TableBody>
      
    </Table>
  )
}

export default AlbumTable
