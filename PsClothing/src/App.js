import { useEffect, useState } from "react";
import "./App.css";
import Allroutes from "./hoc/Allroutes";
import Preloader from "./components/Preloader";



function geoMap(){
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
  } else {
      console.log("Geolocation not supported")
  }
  }
  
  function showPosition(position) {
  console.log(position.coords.latitude+","+position.coords.longitude);
}
geoMap()

function App() {
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000); // Simulating a 2-second loading time
      }, []);
  return (
    
      <>
        <div style={{height:"100vh"}}>
            {loading ? <Preloader /> : (
 
            <Allroutes />
                
        )}
        </div>
        </>
    
  );
}

export default App;
