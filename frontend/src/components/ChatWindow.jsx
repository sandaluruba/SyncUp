import React from 'react'
import { useChatStore } from '../store/useChatStore';
import { Loader } from 'lucide-react';
import { useEffect } from 'react';
import ChatHeader from './ChatHeader.jsx';
import MessageInput from './MessageInput.jsx';
import MessageSkeleton from './Skeletons/MessageSkeleton.jsx';
import { useAuthStore } from '../store/useAuthStore.js';
import { formatMessageTime } from '../lib/utils.js';

function ChatWindow() {
    const {messages, getMessages, isMessagesLoading, selectedUser, getSocketMessages, offGetSocketMessages} = useChatStore();
    const {authUser} = useAuthStore();

    useEffect(() => {
        getMessages(selectedUser._id);

        getSocketMessages();

        return () => offGetSocketMessages();
    }, [selectedUser._id, getMessages, getSocketMessages, offGetSocketMessages]);

    if(isMessagesLoading) {
        return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader />

            <MessageSkeleton />

            <MessageInput />
        </div>
    )}


  return (
    <div className='flex-1 flex flex-col overflowe-auto'>
        <ChatHeader />
        
        <div className='flex-1 overflow-y-auto p-4 space-y-4'>
            {messages.map((msg) => (
                <div
                key={msg._id}
                className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}>
                    <div className='chat-image avatar'>
                        <div className='size-10 rounded-full border'>
                            <img src={msg.senderId === authUser._id ? authUser.profilePicture || "/avatar.png" : selectedUser.profilePicture || "/avatar.png"} alt="Profile Picture"/>
                        </div>
                    </div>
                    <div className='chat-header mb-1'>
                        <time className='text-sm opacity-50 ml-1'>
                            {formatMessageTime(msg.createdAt)}
                        </time>
                    </div>
                    <div className='chat-bubble flex flex-col'>
                        {msg.image && (
                            <img 
                            src={msg.image}
                            alt="Message Attachment"
                            className="sm:max-w-[200px] rounded-md mb-2"
                            />
                        )}
                        {msg.message && (
                            <p>{msg.message}</p>
                        )}
                    </div>
                </div>
            ))}
        </div>

        <MessageInput />
    </div>
  )
}

export default ChatWindow
