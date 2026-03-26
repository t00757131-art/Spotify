import ChatHeader from "@/components/chat/ChatHeader"
import ChatInput from "@/components/chat/ChatInput"
import NoConversationPlaceholder from "@/components/chat/NoConversationPlaceholder"
import UsersList from "@/components/chat/UsersList"
import TopNavbar from "@/components/TopNavbar"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useGetAllUsers, useGetUserMessages } from "@/hooks/useUser"
import type { Message } from "@/interfaces/message"
import useChatStore from "@/store/useChatStore"
import usePlayerStore from "@/store/usePlayerStore"
import { RedirectToSignIn, useAuth, useUser } from "@clerk/react"
import { useEffect, useRef } from "react"

const ChatPage = () => {
  const { isSignedIn, isLoaded, userId } = useAuth()
  const { user } = useUser()

  const { users: allUsers, isLoading } = useGetAllUsers()
  const { data: userMessages, isLoading: userMessagesLoading } =
    useGetUserMessages(userId!)

  const { setMessages, selectedUser, setUsers, messages,socket } = useChatStore()
  const { isMobile } = usePlayerStore()
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (allUsers) {
      setUsers(allUsers)
    }
  }, [allUsers, setUsers])

  useEffect(() => {
    if (!selectedUser) return;
   
      setMessages(userMessages || []);
    
  }, [userMessages, setMessages, selectedUser])

  useEffect(()=>{
    if(!socket) return;

    const handleMessage = (message:Message) => {
      if (message.senderId !== selectedUser?._id &&
          message.receiverId !== selectedUser?._id) return;

      setMessages((prev) => {
        if (prev.some((m) => m._id === message._id)) return prev;
        return [...prev, message];
      });
    } ;

    socket.on("receive-message", handleMessage);

    return () => {
      socket.off("receive-message", handleMessage);
    };
  },[socket, selectedUser, setMessages])

  useEffect(()=>{
    if(bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  },[messages?.length])

  if (!isLoaded) return null

  if (!isSignedIn) {
    return <RedirectToSignIn />
  }

  if (isLoading || userMessagesLoading) return
  ;<div>Loading...</div>

  const messageTime = (value: string) => {
    const time = new Date(value).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      hourCycle: "h12",
    })
    return time
  }

  return (
    <main className="h-full w-full flex flex-col  overflow-hidden rounded-md bg-linear-to-b from-zinc-800 to-zinc-900">
      <TopNavbar />
      <div className=" flex-1 min-h-0 grid overflow-hidden grid-cols-[80px_1fr] lg:grid-cols-[300px_1fr] h-[calc(100vh-180px)]">
        <UsersList />

         <div className="flex h-full min-h-0 flex-col overflow-hidden">
          {selectedUser ? (
            <>
              <ChatHeader />

              {/* messages  */}

              <ScrollArea className="min-h-0 flex-1 overflow-y-auto h-[calc(100vh-340px)]">
                <div className={`space-y-4 ${isMobile ? "p-2" : "p-4"} `}>
                  {user &&
                    messages?.map((message) => (
                      <div
                        key={message._id}
                        className={`item-start flex w-full gap-3 ${message.senderId === user?.id ? "flex-row-reverse" : ""} `}
                      >
                        <Avatar className={isMobile ? "size-8" : "size-10"}>
                          <AvatarImage
                            src={
                              message.senderId === user?.id
                                ? user?.imageUrl
                                : selectedUser?.imageUrl
                            }
                            alt={
                              message.senderId === user?.id
                                ? user.fullName!
                                : selectedUser.fullname!
                            }
                            className="size-full object-cover"
                          />
                        </Avatar>

                        <div
                          className={`rounded-lg text-white ${isMobile ? "px-2 py-1" : "px-4 py-2"} ${message.senderId === user?.id ? "bg-[#1DB954]" : "bg-[#333333]"} `}
                        >
                          <p className="text-sm wrap-break-word">{message.content}</p>
                          <span className={`mt-1 block text-xs  font-medium
                            ${message.senderId === user?.id ? "text-zinc-800":"text-zinc-400"}
                            `}>
                            {messageTime(message.createdAt!)}
                          </span>
                        </div>
                      </div>
                    ))}

                    <div ref={bottomRef} />
                </div>
              </ScrollArea>

             

              
                <ChatInput />
            </>
          ) : (
            <NoConversationPlaceholder />
          )}
          </div>
      </div>
    </main>
  )
}

export default ChatPage
