import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import MainLayout from "./layout/MainLayout"
import ChatPage from "./pages/ChatPage"
import AlbumPage from "./pages/AlbumPage"
import AdminPage from "./admin/AdminPage"
import { useEffect } from "react"
import { useAuth } from "@clerk/react"
import useChatStore from "./store/useChatStore"
import NotFoundPage from "./pages/NotFoundPage"



const App = () => {
   const {userId} = useAuth();
    const {initSocket,closeSocket} = useChatStore();

  useEffect(()=>{
          if(userId){
           initSocket(userId);
           console.log('Socket Initialized')
          }
        return ()=>closeSocket();
    },[closeSocket, userId, initSocket])
  return (
    <>
    
     <Routes>
      <Route path="/admin" element={<AdminPage/>}/>
      
       <Route element={<MainLayout/>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage/>}/>
          <Route path="/album/:albumId" element={<AlbumPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
       </Route>
      </Routes> 
    </>
  )
}

export default App
