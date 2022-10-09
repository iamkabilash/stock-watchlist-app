const AutoComplete = () =>{
    return(
        <div className="flex flex-col w-screen items-center">
            <input className="w-[250px] h-[40px] bg-green-200 rounded-lg p-5" type="text" id="search" placeholder="Search" autoComplete="off" />
        </div>
    );
}

export default AutoComplete;