import FeatureSongSkeletion from "@/components/skeletons/FeatureSong";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAdminStats } from "@/hooks/useAdmin";
import { LibraryIcon, ListMusicIcon, UsersIcon, UserStarIcon } from "lucide-react"

const DashboardStats = () => {

  const {data:stats,isLoading:statsLoading} = useGetAdminStats();

  const statsData = [
    {
        title:'Total Songs',
        icon:ListMusicIcon,
        value:stats?.totalSongs.toString() || 0,
        bgColor:'bg-emerald-500/10',
        iconColor:'text-emerald-500'
    },
    {
        title:'Total Albums',
        icon:LibraryIcon,
        value:stats?.totalAlbums.toString() || 0,
        bgColor:'bg-violet-500/10',
        iconColor:'text-violet-500'
    },
    {
        title:'Total Users',
        icon:UsersIcon,
        value:stats?.totalUsers.toString() || 0,
        bgColor:'bg-orange-500/10',
        iconColor:'text-orange-500'
    },
    {
        title:'Total Artists',
        icon:UserStarIcon,
        value:stats?.totalArtists.toString() || 0,
        bgColor:"bg-sky-500/10",
        
    }
  ]

  if(statsLoading){
    return <FeatureSongSkeletion/>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

      {
        statsData.map((stat,index)=>(
            <Card key={index} className="bg-zinc-800/50 cursor-pointer border-zinc-700/50 hover:bg-zinc-800/80 transition-colors">
                <CardContent className="p-4">

                    <div className="flex items-center gap-4">
                        <div className={`${stat.bgColor} p-2.5 rounded-md`}>
                            <stat.icon className={`${stat.iconColor} size-6`}/>
                        </div>

                        <div className="flex-1">
                            <p className="text-sm text-zinc-400 min-w-0 truncate">{stat.title}</p>
                            <p className="text-2xl font-medium text-white ">{stat.value}</p>
                        </div>

                    </div>

                </CardContent>

            </Card>
        ))
      }
     
    </div>
  )
}

export default DashboardStats
