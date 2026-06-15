import React from 'react'

import ChatWindow from '../components/ChatWindow.jsx'
import NoChatSelected from '../components/NoChatSelected.jsx'
import Sidebar from '../components/Sidebar.jsx'

import {useChatStore} from "../store/useChatStore.js"

function home() {
  const {selectedUser} = useChatStore();
  return (
    <div className='h-screen bg-base-200'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg shadow-lg w-full max-w-12xl h-[calc(100vh-6rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatWindow />}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default home
