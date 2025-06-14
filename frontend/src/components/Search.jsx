import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import "./Search.css"
export function Search({placeholder}) {
    const [search, setSearch] = useState("")
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
     if (loading) {
        return (
        <div className="loading-screen">
            <div className="spinner" />
            <p className="loading-text">Loading, please wait...</p>
        </div>
        );
    }
    return <div className="search">
            <input name="search-box" type="text" placeholder={placeholder} value={search} 
                onChange={(e) => setSearch(e.target.value)}
            />
            <button name="search-btn" onClick={async () => {
                try {
                    setLoading(true);
                    const response = await fetch(`http://localhost:3000/aval/cc/user/getContent?prompt=${encodeURIComponent(search)}`, {
                        method: 'GET', 
                        headers: {
                        'Content-Type': 'application/json',
                        },
                    });
                    const data = await response.json();
                    const parsedResult = JSON.parse(data.result);


                    const response1 = await fetch(`http://localhost:3000/aval/cc/user/getYoutubeVid?prompt=${encodeURIComponent(search)}`, {
                        method: 'GET', 
                        headers: {
                        'Content-Type': 'application/json',
                        },
                    });

                    const data1 = await response1.json();
                    const parsedResult1 = data1.result;  

                    const response2 = await fetch(`http://localhost:3000/aval/cc/user/getWebsites?prompt=${encodeURIComponent(search)}`, {
                        method: 'GET', 
                        headers: {
                        'Content-Type': 'application/json',
                        },
                    });
                    const data2 = await response2.json();
                    const parsedResult2 = data2.result;
                    navigate('/searchResults', {
                        state: {
                            content: parsedResult.response,
                            websites: parsedResult2,
                            youtubeLinks: parsedResult1,
                            title:search.toUpperCase()
                        }
                    });                    
                } catch (error) {
                        console.error('Error fetching data:', error);
                }finally {
                    setLoading(false);  // Stop loading
                }
            }
            }><FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        {/* <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> */}
    </div>
}
