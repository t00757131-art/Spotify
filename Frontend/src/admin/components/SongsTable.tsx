import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteSong } from "@/hooks/useAdmin";
import useMusicStore from "@/store/useMusicStore";
import usePlayerStore from "@/store/usePlayerStore";
import { Calendar1Icon, Loader2Icon, SquarePenIcon, Trash2Icon } from "lucide-react";


const SongsTable = () => {
   
    const {isMobile} = usePlayerStore();

    const {mutate:deleteSong,isPending,variables} = useDeleteSong();
    
    const {songs} = useMusicStore();

    const handleSongDelete =(songId:string)=>{
         deleteSong(songId);
    }

  return (
    <Table>
       <TableHeader>
        <TableRow className="hover:bg-zinc-800/50 transition-colors">
           <TableHead className={isMobile ? "w-0":"w-20"}></TableHead>
           <TableHead>Title</TableHead>
           <TableHead>Artist</TableHead>
           <TableHead>Release Date</TableHead>
           <TableHead className="text-right">Actions</TableHead>
        </TableRow>
       </TableHeader>

       <TableBody>
        {
            songs?.map((song)=>(
                <TableRow key={song._id} className="hover:bg-zinc-800/50">
                    <TableCell className={isMobile ? "w-0":"w-20 shrink-0 "}>
                      <img src={song.imageUrl} alt={song.title} className="w-full shrink-0  rounded object-cover"/>
                    </TableCell>
                    <TableCell className="font-medium">{song.title}</TableCell>
                    <TableCell>{song.artist}</TableCell>
                    <TableCell >
                        <div className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-300 transition-colors">
                              <Calendar1Icon className="size-4"/>
                              <span className="text-sm">
                                  {song.createdAt.split('T')[0]}
                              </span>
                        </div>
                    </TableCell>
                    <TableCell className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                            <Button
                            size={isMobile ? "icon":'icon-lg'}
                            variant={'ghost'}
                            aria-label="Edit song"
                            
                            
                            className="text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/20"
                            >
                               
                                <SquarePenIcon className="size-4"/>

                            </Button>


                           
                           <AlertDialog>
                             <AlertDialogTrigger asChild>
                                <Button
                                    size={isMobile ? "icon":'icon-lg'}
                                    variant={'ghost'}
                                    aria-label="Delete song"
                                    disabled={variables === song._id && isPending}
                                   
                                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                >
                                    {
                                        variables === song._id && isPending ? <Loader2Icon className="size-4 animate-spin"/>
                                        :
                                        <Trash2Icon className="size-4"/>
                                    }
                                    

                                </Button>
                             </AlertDialogTrigger>
                             <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you sure to delete the song ? 
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This song will be permanently deleted
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                         Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction asChild>
                                         <Button onClick={()=>handleSongDelete(song._id)} variant={'destructive'}
                                          >
                                                Delete song
                                         </Button>
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

export default SongsTable
