import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LibraryIcon } from "lucide-react";
import AddAlbumDialog from "./AddAlbumDialog";
import AlbumTable from "./AlbumTable";


const AlbumTabContent = () => {
  return (
    <Card >
      <CardHeader>
        <div className="flex items-center justify-between">
           <div>
             <CardTitle className="flex items-center gap-2">
               <LibraryIcon className="size-5 text-emerald-500"/>
               <span className="text-sm font-medium">
                 Albums Library
               </span>
             </CardTitle>

             <CardDescription>
              <p>Manage your albums collection</p>
             </CardDescription>
           </div>

           {/* create song button  */}
           <AddAlbumDialog/>
         </div>
      </CardHeader>

      <CardContent>
        <AlbumTable/>
      </CardContent>
    
    </Card>
  )
}

export default AlbumTabContent;
