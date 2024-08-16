// import logo from './logo.svg';
import './App.css';
import { DataProvider } from './components/DataProvider';
import { MainSection } from './components/MainSection';
import Navbar from './components/Navbar';

function App() {
  return (
   <DataProvider>
    
    <Navbar/>
    <MainSection/>

   </DataProvider>
  );
}

export default App;
