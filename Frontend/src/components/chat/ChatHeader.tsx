import useChatStore from "@/store/useChatStore"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import usePlayerStore from "@/store/usePlayerStore";


const ChatHeader = () => {

    const {selectedUser,onlineUsers} = useChatStore();
    const {isMobile} = usePlayerStore();

    if(!selectedUser) return null;

    const isOnline = onlineUsers.has(selectedUser?.clerkId);

  return (
    <div className="p-4 border-b border-zinc-800 pointer-events-none bg-neutral-800 backdrop-blur-3xl sticky top-0">
        <div className="flex items-center gap-3">
           <Avatar className={isMobile ? "size-8" : "size-10"}>
            <AvatarImage src={selectedUser?.imageUrl} alt={selectedUser?.fullname}  className="w-full h-full object-cover"/>
            <AvatarFallback>
                {selectedUser?.fullname.split(" ")[0] || "User"}
            </AvatarFallback>
           </Avatar>

           <div>
            <h2 className={`font-medium text-white ${isMobile ? "text-sm" : "text-base"}`}>
                {selectedUser?.fullname}
            </h2>
            <p className={`text-sm text-zinc-400 ${isMobile ? "text-xs":"text-sm"}`}>
                {
                    isOnline ? "Online" : "Offline"
                }
            </p>
           </div>

        </div>
      
    </div>
  )
}

export default ChatHeader
