import React from 'react'
import { useChatStore } from '../store/useChatStore';
import { Loader } from 'lucide-react';
import { useEffect } from 'react';
import ChatHeader from './ChatHeader.jsx';
import MessageInput from './MessageInput.jsx';
import MessageSkeleton from './Skeletons/MessageSkeleton.jsx';

function ChatWindow() {
    const {messages, getMessages, isMessagesLoading, selectedUser} = useChatStore();

    useEffect(() => {
        getMessages(selectedUser._id)
    }, [selectedUser._id, getMessages])

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
        
        <p>Messages...</p>

        <MessageInput />
    </div>
  )
}

export default ChatWindow
