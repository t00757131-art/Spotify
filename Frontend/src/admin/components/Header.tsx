import usePlayerStore from "@/store/usePlayerStore"
import { UserButton } from "@clerk/react"
import { Link } from "react-router-dom"


const Header = () => {
    const {isMobile} = usePlayerStore()
  return (
    <div className="w-full h-18 bg-zinc-800/70 z-50 px-4 sm:px-6 md:px-8 mb-4 sticky top-0 backdrop-blur-2xl blur-out-3xl">

        <div className="flex items-center justify-between w-full h-full mx-auto">

            <div className="flex items-center gap-2.5">

            <Link to={'/'} className={`${isMobile ? "size-7":"size-10"}`}>
                <img src="/spotify.png" alt="spotify logo" className={`object-cover`}/>
                </Link>

                <div className="overflow-hidden truncate">
                    <h1 className="lg:text-2xl md:text-xl truncate min-w-0 text-lg font-medium text-white">Music Manager</h1>
                    <p className="text-sm text-zinc-300 min-w-0 truncate">Manage your music collection</p>
                </div>

            </div>

            <UserButton/>

        </div>
     
    </div>
  )
}

export default Header
