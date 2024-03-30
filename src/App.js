import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Body from './Components/Body';
import Footer from './Components/Footer';
import About from './Components/About';
import CommentComp from './Components/CommentComp';
import { Routes,Route} from 'react-router-dom';
import { useState } from 'react';


function App() {
   let [currentHotel,setCurrentHotel] = useState({})

   let handleCommentClick = (hotel)=>{
    setCurrentHotel(hotel);
    console.log("Comment clicked",hotel);
}
   
  return (
    <>
    <Header></Header>
    
      <Routes>
        <Route path="/" exact element={<Body handleCommentClick={handleCommentClick} />} />
        <Route path="/about" element={<About />} />
        <Route path="/comment" element={<CommentComp currentHotel={currentHotel} />} />
      </Routes>
   
  
    <Footer></Footer>
   
    </>
  );
}

export default App;
