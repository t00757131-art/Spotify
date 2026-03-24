
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MusicIcon } from "lucide-react"
import SongsTable from "./SongsTable"
import AddSongDialog from "./AddSongDialog"


const SongsTabContent = () => {
  return (
    <Card >
      <CardHeader>
         <div className="flex items-center justify-between">
           <div>
             <CardTitle className="flex items-center gap-2">
               <MusicIcon className="size-5 text-emerald-500"/>
               <span className="text-sm font-medium">
                 Songs
               </span>
             </CardTitle>

             <CardDescription>
              <p>Manage your music tracks</p>
             </CardDescription>
           </div>

           {/* create song button  */}
           <AddSongDialog/>
         </div>
      </CardHeader>

      <CardContent>
        <SongsTable/>
      </CardContent>
    </Card>
  )
}

export default SongsTabContent;
