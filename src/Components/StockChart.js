import Chart from "react-apexcharts";
import { useState } from "react";

const StockChart = ({chartData, symbol}) =>{
    const [dateFormat, setDateFormat] = useState("24h");
    const {day, week, year} = chartData;

    const timeFrame = () =>{
        switch(dateFormat){
            case "24h":
                return day;
            case "7d":
                return week;
            case "1y":
                return year;
            default:
                return day;
        }
    }

    //console.log(timeFrame());
    const color = timeFrame()[timeFrame().length - 1].y - timeFrame()[0].y > 0 ? "#26C281" : "#ED3419";
    //console.log(color);

    const options = {
        colors: [color],
        title: {
            text: symbol,
            align: "center",
        },
        chart: {
            id: "stock data",
        },
        xaxis: {
            type: "datetime",
            labels: {
                datetimeUTC: false
            }
        },
        tooltip: {
            x: {
                format: "MMM dd, HH:MM"
            }
        }
    }
    
    const series = [{
        name: symbol,
        data: timeFrame()
    }];
    const buttonSelected = (button) =>{
        const classes = "px-2 mx-2 rounded ";
        //console.log(dateFormat);
        if(button === dateFormat){
            return classes + "bg-red-200"
        } else{
            return classes + "bg-sky-200"
        }
    }
    return (
        <div className="w-[60vw] mx-auto mt-[40px]">
            <Chart options={options} series={series} type="area" width="100%"  />
            <div>
                <button onClick={() => setDateFormat("24h")} className={buttonSelected("24h")}>24h</button>
                <button onClick={() => setDateFormat("7d")} className={buttonSelected("7d")}>7d</button>
                <button onClick={() => setDateFormat("1y")} className={buttonSelected("1y")}>1y</button>
            </div>
        </div>
    );
}

export default StockChart;