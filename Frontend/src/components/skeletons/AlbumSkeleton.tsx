import { Card, CardContent, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"


const AlbumSkeleton = () => {
  return (
   <Card className="w-full">

    <CardHeader className="w-full">
        <div className="w-full flex items-center gap-4 mb-4">
            <Skeleton className="size-20 rounded-md shrink-0"/>

            <div className="flex-1">
                <Skeleton className="h-4 w-3/4"/>
                <Skeleton className="h-4 w-1/2 mt-2"/>
            </div>

        </div>
    </CardHeader>

    <CardContent className="w-full space-y-5">
        <Skeleton className="h-6 w-full"/>
        <Skeleton className="h-6 w-full"/>
        <Skeleton className="h-6 w-full"/>
        <Skeleton className="h-6 w-full"/>
    </CardContent>

   </Card>
  )
}

export default AlbumSkeleton
