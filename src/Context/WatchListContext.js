import { createContext } from "react";

const WatchListContext = createContext();

export const WatchListContextProvider = (props) =>{
    return (
        <WatchListContext.Provider>
        </WatchListContext.Provider>
    );
}