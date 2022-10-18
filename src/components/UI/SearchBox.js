import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SearchBox = () => {
    
    const [searchParam, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState("")
    const handleInput = (e) => {
        setSearch(e.target.value)
    }
    useEffect(()=>{
        const queryParam = searchParam.get('search')
        setSearch(queryParam||"")
    },[searchParam])


    const handleFormSubmission = (e) => {
        e.preventDefault();
        console.log(search)
        setSearchParams({
            search: search
        })
    }

    return (
        <div className="searchBox-container">
            <form onSubmit={handleFormSubmission}>
                <input name="search" type="text"
                    id="search" placeholder="Enter product name, category" onChange={handleInput} value={search} />
                <button type="submit" >
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="20"
                        height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="10" cy="10" r="7" />
                        <line x1="21" y1="21" x2="15" y2="15" />
                    </svg>
                </button>
            </form>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="20"
                height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round"
                strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="10" cy="10" r="7" />
                <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
        </div>
    )
}
export default SearchBox;