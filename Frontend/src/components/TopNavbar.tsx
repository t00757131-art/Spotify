import { Show, SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/react"
import { Button, buttonVariants } from "./ui/button"
import useCheckAdmin from "@/hooks/useCheckAdmin"
import { Link } from "react-router-dom";
import { LayoutDashboardIcon, LoaderIcon } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { Card, CardHeader } from "./ui/card";
import { cn } from "@/lib/utils";

const TopNavbar = () => {

    const {data:adminData,isLoading} = useCheckAdmin();

    const {isSignedIn} = useAuth();

    const {isLoaded}  = useAuth();

    

    if(!isLoaded){
      return (
        <Card className="w-full ">

          <CardHeader className="space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>

        </Card>
      )
    }

   

    

  return (
    <div className={`flex items-center justify-between  p-4 bg-zinc-900/75 backdrop-blur-md 
      sticky top-0 z-10
    `}>

        <Link to={'/'} className="flex items-center gap-2">
          <img src="/spotify.png" alt="spotify-logo" className="md:size-9  size-8 shrink-0"/>
          <span className="text-white text-lg font-semibold  hidden md:inline">Spotify</span>
        </Link>

        

        {
         isSignedIn && isLoading  ? 
          (
            <div className="flex items-center justify-center gap-2 mr-10">
                <LoaderIcon className="size-5 animate-spin text-green-400 font-semibold"/>
            </div>
          )
          :
           isSignedIn && adminData?.isAdmin ? 
            (
              <div className="flex items-center gap-4">
                    <Link to={'/admin'} className={cn(buttonVariants({variant:'ghost'}), " flex items-center gap-2 px-3 py-5 bg-neutral-800")}>
                        <LayoutDashboardIcon className="w-5 h-5"/>
                        <span className="text-sm">Admin Dashboard</span>
                    </Link>
                    <UserButton  />
                </div>
              
            )
            :
            (
            <UserButton/>
            )

        }

         
         <Show when={'signed-out'} >
           <div className="flex items-center gap-6">
            
                <Button size={'lg'} asChild>
                    <SignUpButton mode="modal"/>
                </Button>

                <Button size={'lg'} variant={'outline'} asChild> 
                    <SignInButton mode="modal"/>
                </Button>

            </div>
         </Show>
         

        
      
    </div>
  )
}

export default TopNavbar
