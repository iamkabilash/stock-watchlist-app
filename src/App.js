import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StockDetailPage from './Pages/StockDetailPage';
import StockOverviewPage from './Pages/StockOverviewPage';

const App = () =>{
  return(
    <main>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StockOverviewPage />} />
          <Route path='/detail/:symbol' element={<StockDetailPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
