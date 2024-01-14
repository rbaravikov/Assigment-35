import { useEffect, useRef, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Input from "./components/Input";
import List from "./components/List";
import TodosContext from "./contexts/TodosContext";


// https://jsonplaceholder.typicode.com/todos

function App() {
  const [listData, setListData] = useState([])
  const firstRender = useRef(true)
  const [apiData, setApiData] = useState([])
  
  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos')
      const data = await response.json()
      setApiData(data)
    } catch (error) {
      console.error(error)
  }}

  useEffect(() => {fetchData()}, [])
  // Užkrovimas iš localstorage ir pavertimas į masyvą
  useEffect(() => {
    let savedData = apiData
    setListData(savedData.slice(0, 5))
  }, [apiData])

  // Išsaugojimas localstorage
  useEffect(() => {
    if(firstRender.current) {
      // Skip first render
      firstRender.current = false
      return;
    }


    localStorage.setItem("listData", JSON.stringify(listData))
  }, [listData])

  return (
   <TodosContext.Provider value={{listData, setListData}}>
      <Header/>
      <Input/>
      <List/>
    </TodosContext.Provider>
  );
}

export default App;
