import { RedirectToSignIn, useAuth } from "@clerk/react"


const ChatPage = () => {

  const {isSignedIn,isLoaded} = useAuth();

  if(!isLoaded) return null;

  if(!isSignedIn){
    // return (
    //   <div className="flex items-center justify-center w-full h-screen backdrop-blur-lg bg-zinc-800">
    //     <SignIn/>
    //   </div>
    // )
    return (
      <RedirectToSignIn/>
    )
  }

  return (
    <div>
      Chat page
    </div>
  )
}

export default ChatPage
