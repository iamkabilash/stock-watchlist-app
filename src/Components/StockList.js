import { useState, useEffect } from "react";
import FinnHub from "../api/FinnHub";
import {AiFillCaretUp, AiFillCaretDown} from "react-icons/ai";

const StockList = () =>{
    const [stock, setStock] = useState();
    const [watchList, setWatchList] = useState(["AAPL", "MSFT", "TSLA"]);

    const changeColor = (change) =>{
        return change>0 ? "text-green-800" : "text-red-800";
    }
    const renderIcon = (change) =>{
        return change>0 ? <AiFillCaretUp /> : <AiFillCaretDown />;
    }
    
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () =>{
            const responses = [];
            try{
                const responses = await Promise.all(watchList.map((stock) => {
                    return (
                        FinnHub.get("/quote", {
                            params: {
                                symbol: stock
                            }
                        })
                    );
                })
                );
                console.log(responses);
                const data = responses.map((response) => {
                    return {
                        data: response.data, 
                        symbol: response.config.params.symbol
                    }
                });
                console.log(data);
                if(isMounted){
                    setStock(data);
                }
            } catch(err){
                console.log(err);
            }
        }
        //fetchData();
        return () => (isMounted = false);
    }, [])

    return(
        <div className="flex flex-col justify-center mt-[100px]">
            <h1 className="text-center">Stock List</h1>
            <table className="shadow-lg bg-white border-collapse mx-[10vw]">
                <thead>
                    <tr>
                        <th className="bg-blue-100 border font-bold px-4 py-2">Name</th>
                        <th className="bg-blue-100 border font-bold px-4 py-2">Last</th>
                        <th className="bg-blue-100 border font-bold px-4 py-2">Chg</th>
                        <th className="bg-blue-100 border font-bold px-4 py-2">Chg%</th>
                        <th className="bg-blue-100 border font-bold px-4 py-2">High</th>
                        <th className="bg-blue-100 border font-bold px-4 py-2">Low</th>
                        <th className="bg-blue-100 border font-bold px-4 py-2">Open</th>
                        <th className="bg-blue-100 border font-bold px-4 py-2">Pclose</th>
                    </tr>
                </thead>
                <tbody>
                    {stock.map((stockData) => {
                        return(
                            <tr key={stockData.symbol}>
                                <td className="border px-4 py-2 font-bold">{stockData.symbol}</td>
                                <td className="border px-4 py-2">{stockData.data.c}</td>
                                <td className={`border px-4 py-2 ${changeColor(stockData.data.d)}`}>{stockData.data.d}{renderIcon(stockData.data.d)}</td>
                                <td className={`border px-4 py-2 ${changeColor(stockData.data.dp)}`}>{stockData.data.dp}{renderIcon(stockData.data.dp)}</td>
                                <td className="border px-4 py-2">{stockData.data.h}</td>
                                <td className="border px-4 py-2">{stockData.data.l}</td>
                                <td className="border px-4 py-2">{stockData.data.o}</td>
                                <td className="border px-4 py-2">{stockData.data.pc}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default StockList;