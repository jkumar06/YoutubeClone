import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constants';
import { cacheResults } from '../utils/searchSlice';

const Head = () => {
    const [searchQuery,setSearchQuery] = useState('');
    const [suggestions,setSuggestions] = useState([]);
    const [showSuggestions,setShowSuggestions] = useState(false);

    const searchCache = useSelector(store => store.search);

    useEffect(() => {
     
     const timer = setTimeout(() => {
        if(searchCache[searchQuery]) {
            setSuggestions(searchCache[searchQuery])
        } else {
            getSearchSuggestions()
        }
    },200);
     
     return () => {
        clearTimeout(timer)
     }
    },[searchQuery]);

    const getSearchSuggestions = async () => {
        console.log("API CALL",searchQuery)
        const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
        const json = await data.json();
        setSuggestions(json[1]);

        dispatch(
            cacheResults({
            [searchQuery]: json[1]
        }))
    }

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
            <div>
            <input
                className=' px-5 w-1/2 border border-grey-400 p-2 rounded-l-full'
                value={searchQuery}
                type='text'
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setShowSuggestions(false)}
                />
            <button 
                className='border border-gray-400 px-5 p-2 rounded-r-full gb-grey-100'>
                🔍
                </button>
                </div>
           { showSuggestions && ( <div className='fixed bg-white py-2 px-2 w-[34rem] shadow-lg rounded-lg border border-gray-100'>
                <ul>
                    {suggestions.map((s) =><li className='py-2 px-3 shadow-sm hover:bg-gray-100'>🔍 {s}</li>)}
                </ul>
            </div>)}
      
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