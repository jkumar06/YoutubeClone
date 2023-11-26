import React, { useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../utils/chatSlice';
import { generateRandomName, makeRandomMessage } from '../utils/helper';


const LiveChat = () => {
    const [liveMessage,setLiveMessage] = useState("");

    const dispatch = useDispatch();
    const chatMessages = useSelector(store => store.chat.messages);

    // console.log(chatMessages)
    useEffect(() => {
      const i = setInterval(() => {
        //API Polling
        dispatch(addMessage({
            name: generateRandomName(),
            message: makeRandomMessage(20)
        }))
        },2000);

        return () => clearInterval(i)
    },[]);


return (
    <div>
        <div className='rounded-lg p-2 ml-2 border border-black w-full h-[500px] bg-slate-100 overflow-y-scroll flex flex-col-reverse'>
        {
            chatMessages.map((c,i)=>(
                <ChatMessage key={i} name={c.name} message={c.message}/>
            ))
        }
        </div>
        <form className='w-full border border-black p-2 ml-2' onSubmit={(e)=>{
            e.preventDefault();
            dispatch(
                addMessage({
                    name : "JKumar",
                    message: liveMessage
                })
            );
            setLiveMessage("");
        }}> 
            <input className='w-full border-black' type="text" value={liveMessage} onChange={(e)=>setLiveMessage(e.target.value)}/>
            <button className='px-2 mx-2 bg-green-200'>send</button>
        </form>
    </div>
    
  )
}

export default LiveChat