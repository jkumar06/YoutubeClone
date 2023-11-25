import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleMenu } from '../utils/appSlice';

const Head = () => {
    const dispatch = useDispatch();

    const toggleMenuHandler = () => {
        dispatch(toggleMenu());
    }

  return (
    <div className='grid grid-flow-col p-5 m-2 shadow-lg    '>
        <div className='flex col-span-1'>
            <img 
            onClick={() => toggleMenuHandler()} 
                className='h-10 cursor-pointer'
                alt ='menu'
                src='https://static.vecteezy.com/system/resources/previews/021/190/402/original/hamburger-menu-filled-icon-in-transparent-background-basic-app-and-web-ui-bold-line-icon-eps10-free-vector.jpg'
                />
            <a href='/'>
         <div>
            <img 
                className='h-10 mx-2'
                alt="log" 
                src="https://t3.ftcdn.net/jpg/03/00/38/90/360_F_300389025_b5hgHpjDprTySl8loTqJRMipySb1rO0I.jpg"/>
        </div>
              </a>
        </div>
       
        <div className='col-span-10 px-10'>
            <input
                className='w-1/2 border border-grey-400 p-2 rounded-l-full'
                type='text'/>
            <button 
                className='border border-gray-400 px-5 p-2 rounded-r-full gb-grey-100'>
                🔍
                </button>
        </div>
        <div className='col-span-1'> 
            <img   
                className='h-10'
                alt="user" 
                src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"/>
        </div>
    </div>
  )
}

export default Head