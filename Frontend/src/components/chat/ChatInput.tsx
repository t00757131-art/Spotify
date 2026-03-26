import useChatStore from "@/store/useChatStore";
import usePlayerStore from "@/store/usePlayerStore";
import { useUser } from "@clerk/react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2Icon, SendIcon } from "lucide-react";


const ChatInput = () => {
    const [newMessage,setNewMessage] = useState("");
    const {user} = useUser();
    const [loading,setLoading] = useState(false);
    const {isMobile} = usePlayerStore();
    const {selectedUser,sendMessage}  = useChatStore();

   const handleSendMessage = ()=>{
    setLoading(true);
      if(!newMessage.trim() || !selectedUser || !user) return;

      sendMessage(selectedUser.clerkId,user.id,newMessage.trim());
      setNewMessage("");
      setLoading(false);
   }


  return (
    <div className={`h-auto sticky bottom-0
    ${isMobile ? "p-2" : "p-4"}
     border-t border-t-zinc-800 shrink-0
    `}>

      <div className="flex items-center gap-2">

        <Input
         placeholder="Enter a message"
         value={newMessage}
         onChange={(e)=>setNewMessage(e.target.value)}
         className="bg-zinc-900 border-none"
         onKeyDown={(e)=>{
          if(e.key==='Enter' && !loading){
            e.preventDefault();
            handleSendMessage();
          }
         }}
        />

        <Button size={'icon'} onClick={handleSendMessage} disabled={!newMessage.trim()}>
          {loading ? <Loader2Icon className="size-5 animate-spin"/> : <SendIcon className="size-5"/>}
        </Button>

      </div>
      
    </div>
  )
}

export default ChatInput
