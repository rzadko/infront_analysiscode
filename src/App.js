import React from 'react';
import './App.css';
import Chart from "./Chart"
import stl from "./data/Oslo_STL.json"
import abb from "./data/Stockholm_ABB.json"

function App() {
  
  return (
    <div>
      <Chart title="Oslo Statoil" data={stl}/>
      <Chart title="Stockholm ABB" data={abb}/>
    </div>
  )
}
  

export default App;

/* API-kall
  
  const [abb, setAbb] = useState({})
  const [stl, setStl] = useState({})

  useEffect(() => {
    getStl()
    getAbb()
  },[])

  const getStl = async () => {
    const res = await fetch("./data/Oslo_STL.json")
    const data = await res.json()
    setStl(data)
  }

  const getAbb = async () => {
    const res = await fetch("./data/Stockholm_ABB.json")
    const data = await res.json()
    setAbb(data)
  }*/