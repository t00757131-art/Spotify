import { Card, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"


const UserSkeleton = () => {
  return (
    <Card className="w-full">
        <CardHeader className="space-y-4">
           
                    <div  className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div>
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
          
        </CardHeader>

    </Card>
  )
}

export default UserSkeleton
