import AudioPlayer from "@/components/AudioPlayer";
import LeftSidebar from "@/components/LeftSidebar";
import PlaybackControls from "@/components/PlaybackControls";
import FriendsActivity from "@/pages/FriendsActivity";
import usePlayerStore from "@/store/usePlayerStore";
import { useEffect } from "react";
import {
    Group,Panel,Separator
    
} from "react-resizable-panels";
import { Outlet } from "react-router-dom";


const MainLayout = () => {

    const {isMobile,setIsMobile} = usePlayerStore();
   

    useEffect(()=>{
        const checkIsMobile = ()=>{
            setIsMobile(window.innerWidth < 768);
        }

        window.addEventListener('resize',checkIsMobile);

        return ()=>window.removeEventListener('resize',checkIsMobile);
    },[isMobile,setIsMobile])

    

  return (
    <div className="h-screen  w-full  text-white bg-black">
        <AudioPlayer/>
        
       <Group orientation={'horizontal'} className={`flex-1 w-full max-h-[calc(100vh-85px)]  
       overflow-hidden text-white bg-black p-2
        mt-0 gap-1
        `}>

        {/* left panel  */}

        <Panel className="no-scrollbar" defaultSize={isMobile ? "30%" : "22%"} minSize={isMobile ? "20%" : "10%"} maxSize={isMobile ? "30%" : "20%"} collapsible={isMobile ? false:true}  >
            <LeftSidebar/>
        </Panel>

            {/* main content  */}

        <Separator/>

        <Panel className="no-scrollbar" defaultSize={isMobile ? "80%" : "58%"} minSize={isMobile ? "80%" : "60%"} maxSize={"80%"}>
            <Outlet/>
        </Panel>

       {!isMobile && (
        <>
       
        <Separator/>

        <Panel defaultSize={isMobile ? "30%" : "22%"} minSize="20%" maxSize="50%" collapsible={isMobile ? false:true} collapsedSize={"0%"}>
           <FriendsActivity/>
        </Panel>
         </>
        )}

       </Group>

       <PlaybackControls/>
      
    </div>
  )
}

export default MainLayout
