import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import MainLayout from "./layout/MainLayout"
import ChatPage from "./pages/ChatPage"
import AlbumPage from "./pages/AlbumPage"
import AdminPage from "./admin/AdminPage"



const App = () => {
  return (
    <>
    
     <Routes>
      <Route path="/admin" element={<AdminPage/>}/>
      
       <Route element={<MainLayout/>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage/>}/>
          <Route path="/album/:albumId" element={<AlbumPage/>}/>
       </Route>
      </Routes> 
    </>
  )
}

export default App
