import type { User } from "@/interfaces/user"
import { create } from "zustand"

interface ChatStore{
    users:User[]| null,
    setUsers:(user:User[])=>void
}

const useChatStore = create<ChatStore>((set)=>({
    users:null,
    setUsers:(users:User[])=>set({users:users})
}))

export default useChatStore
