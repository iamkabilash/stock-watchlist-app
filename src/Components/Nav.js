import { Link } from "react-router-dom";

const Nav = () =>{
    return (
        <nav className="w-screen flex flex-row items-center justify-center h-[60px] mb-[20px] bg-sky-200">
            <div>
                <Link className="text-3xl font-bold" to="./">Stock Watchlist App</Link>
            </div>
        </nav>
    );
}

export default Nav;