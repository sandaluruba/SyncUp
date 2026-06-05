import React from 'react'
import { useRef, useState } from 'react';
import { useChatStore } from '../store/useChatStore.js';
import { X, Image, Send } from 'lucide-react';

function MessageInput() {
  const [text, setText] = useState("");
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const {sendMessage} = useChatStore();

  const handleFileChange = (e) => {}

  const removeImage = () => {}

  const handleSubmit = async (e) => {}

  return (
    <div className='p-4 w-full'>
      {preview && (
        <div className='mb-3 flex items-center gap-2'>
          <div className='relative'>
            <img src={preview} alt="Preview" 
            className='size-20 object-cover rounded-lg border border-zinc-700' />
            <button
            onClick={removeImage}
            className='absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300
            flex items-center justify-center'
            type='button'
            >
              <X className='size-3' />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className='flex items-center gap-2'>
        <div className='flex-1 flex gap-2'>
          <input
          type='text'
          className='w-full input input-bordered rounded-lg input-sm sm:input-md'
          placeholder='Type a message...'
          value={text}
          onChange={(e) => setText(e.target.value)} />

          <input
          type='file'
          accept='image/*'
          className='hidden'
          ref={fileInputRef}
          onChange={handleFileChange} />

          <button 
          type='button'
          className={`hidden sm:flex btn btn-circle
          ${preview ? "text-emerald-500" : "text-zinc-500"}`}
          onClick={() => fileInputRef.current?.click()}>
            <Image size={20} />
          </button>
        </div>
        <button
        type='submit'
        className='btn btn-circle btn-primary'
        disabled={!text.trim() && !preview}>
          <Send size={20} />
        </button>
      </form>
      
    </div>
  )
}

export default MessageInput
