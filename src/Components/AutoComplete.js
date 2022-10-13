import { useState, useEffect, useContext } from "react";
import FinnHub from "../api/FinnHub";
import { WatchListContext } from "../Context/WatchListContext";

const AutoComplete = () =>{
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const {addStock} = useContext(WatchListContext);

    const renderDropdown = () =>{
        const dropdownClass = search ? "block" : "hidden";
        return (
            <ul className={`absolute top-[65px] bg-white w-[250px] h-[400px] overflow-y-auto border border-solid-1 ${dropdownClass}`}>
                {results.map((result) => {
                    return(
                        <li onClick={() => {
                            addStock(result.symbol);
                            setSearch("");
                        }} key={result.symbol} className="hover:bg-sky-200 cursor-pointer">{result.description}({result.symbol})</li>
                    )
                })}
            </ul>
        )
    }

    useEffect(() =>{
        let isMounted = true;
        const fetchData = async () =>{
            try{
                const response = await FinnHub.get("/search", {
                    params:{
                        q: search
                    }
                });
                if(isMounted){
                    setResults(response.data.result);
                }
            } catch(err){

            }
        }
        if(search.length> 0){
            fetchData()
        } else{
            setResults([]);
        }
        return () => (isMounted = false);
    }, [search]);

    return(
        <div className="flex flex-col w-screen items-center">
            <input className="w-[250px] h-[40px] bg-green-200 rounded-lg p-5" type="text" id="search" placeholder="Search" autoComplete="off"
            value={search} onChange={(e) => setSearch(e.target.value)} />
            {renderDropdown()}
        </div>
    );
}

export default AutoComplete;