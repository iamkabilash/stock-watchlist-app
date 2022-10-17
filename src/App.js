import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StockDetailPage from './Pages/StockDetailPage';
import StockOverviewPage from './Pages/StockOverviewPage';
import Nav from './Components/Nav';
import { WatchListContextProvider } from './Context/WatchListContext';

const App = () =>{
  return(
    <main>
      <WatchListContextProvider>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path='/' element={<StockOverviewPage />} />
            <Route path='/detail/:symbol' element={<StockDetailPage />} />
          </Routes>
        </BrowserRouter>
      </WatchListContextProvider>
    </main>
  );
}

export default App;
