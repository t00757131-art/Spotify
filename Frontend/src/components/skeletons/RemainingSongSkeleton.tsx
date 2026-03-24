import { Skeleton } from "../ui/skeleton"


const RemainingSongSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {
            Array.from({length:4}).map((_,index)=>(
                <div key={index} className="rounded-md bg-zinc-800/40 p-4">
                    <div className="w-full aspect-square mb-4">
                     <Skeleton className="w-full h-full rounded-md"/>
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-3/4"/>
                        <Skeleton className="h-4 w-1/2"/>
                    </div>

                </div>
            ))
        }
      
    </div>
  )
}

export default RemainingSongSkeleton
