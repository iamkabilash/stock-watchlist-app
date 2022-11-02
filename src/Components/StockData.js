import { useState, useEffect } from "react"; 
import FinnHub from "../api/FinnHub";

const StockData = ({ symbol }) =>{
    
    const [stockData, setStockData] = useState();

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () =>{
            try{
                const response = await FinnHub.get("/stock/profile2", {
                    params: {
                        symbol: symbol
                    }
                })
                //console.log(response);
                if(isMounted){
                    setStockData(response.data);
                }
            } catch(err){
                console.log(err);
            }
        }
        fetchData();
        //console.log(stockData);
        return () => isMounted = false; 
    }, [symbol]);
    
    return (
        <div className="w-screen flex flex-col items-center justify-center mt-[24px]">
            <h2 className="text-2xl font-bold">Stock Data</h2>
            {stockData && (
                <div className="flex flex-col gap-[6px] mt-[10px]">
                    <img src={stockData.logo} className="w-[50px]" alt="" />
                    <h3 className="font-semibold text-sky-800">Name: {stockData.name}</h3>
                    <h3 className="font-semibold text-sky-800">Country: {stockData.country}</h3>
                    <h3 className="font-semibold text-sky-800">Currency: {stockData.currency}</h3>
                    <h3 className="font-semibold text-sky-800">Exchange: {stockData.exchange}</h3>
                    <h3 className="font-semibold text-sky-800">IPO date: {stockData.ipo}</h3>
                    <h3 className="font-semibold text-sky-800">Phone: {stockData.phone}</h3>
                    <h3 className="font-semibold text-sky-800">URL: {stockData.weburl}</h3>
                    <h3 className="font-semibold text-sky-800">Outstanding shares: {stockData.shareOutstanding}</h3>
                </div>
            )}
        </div>
    );
}


export default StockData;