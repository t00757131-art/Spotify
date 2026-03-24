import { Card, CardContent } from "../ui/card"
import { Skeleton } from "../ui/skeleton"


const FeatureSongSkeletion = () => {
  return (
    <div className="w-full overflow-hidden rounded-md mt-1 grid md:grid-cols-3 bg-zinc-900 p-3 gap-5 grid-cols-1 sm:grid-cols-2">

        {
            Array.from({length:6}).map((_,index)=>{
                return (
                    <Card key={index} className="p-2">
                      <CardContent>
                        <div className="flex items-center gap-2.5">
                            <Skeleton className="size-14 rounded-md"/>
                            <div className="flex-1 hidden md:block space-y-1.5">
                                <Skeleton className="w-3/4 h-4 rounded"/>
                                <Skeleton className="w-1/2 h-4 rounded"/>
                            </div>
                        </div>                        
                      </CardContent>
                    </Card>
                )
            })
        }
      
    </div>
  )
}

export default FeatureSongSkeletion
