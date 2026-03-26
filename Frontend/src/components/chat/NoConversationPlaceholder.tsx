const NoConversationPlaceholder = () => {
 return (
    <div className="flex flex-col items-center justify-center space-y-6 h-full">
      <img src="/spotify.png" className="size-16 animate-bounce"/>
      <div className="text-center">
        <h2 className="text-lg mb-1 text-zinc-300 font-medium">
          No Coversation Selected
        </h2>
        <p className="text-sm text-zinc-500 font-medium">
          Select a friend to start a conversation
        </p>

      </div>

    </div>
 )
}


export default NoConversationPlaceholder;