import React, { useRef, useState } from 'react'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import UserCard from '../../components/userCard/UserCard'
import axios from '../../utils/axios'
import './search.css'

const Search = () => {

    const searchName = useRef()
    const [users,setUsers] = useState(null)
    const [isSearched,setIsSearched] = useState(false)

    const handleSearch = async (e) =>{
        e.preventDefault()
        
        if(searchName.current.value){
            try {
                const res = await axios.get(`/users/search/${searchName.current.value}`)
                setUsers(res.data)
                
            } catch (error) {
                console.log(error);
            }
            
        }
        setIsSearched(true)
        searchName.current.value=""
    }

    return (
        <div>
            <Topbar />
            <div className='searchContainer'>
                <Sidebar />
                <div className='search'>
                    <div className="searchWrapper">
                        <form className="searchBox" onSubmit={handleSearch}>
                            <input placeholder='search by name' required className='searchInput' ref={searchName} />
                            <button type='submit' className='searchButton'>Search</button>
                        </form>
                    </div>
                    <div className="searchResultWrapper">
                    {
                    users && users?.length !== 0
                    ?
                    users.map(u=>{
                        return <UserCard key={u._id} user={u} />
                    })
                    :
                    <div className='searchResultText'>
                        {isSearched ? "No user with this username exist." : "Enter the username to search for friends."}
                    </div>
                    }
                    </div>
                </div>
                <Rightbar />
            </div>
        </div>
    )
}

export default Search
