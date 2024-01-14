import { useContext, useRef, useState } from "react"
import TodosContext from "../contexts/TodosContext"
import uuid from "react-uuid"


const Input = () => {
  const {setListData} = useContext(TodosContext)
  const inputRef = useRef()
  const listData = useContext(TodosContext)

  
const handlePost = async (newData) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })

    const responseData = await response.json()
    console.log(responseData)
  } catch (error) {
    console.error(error);
  }
}

  const handleAdd = () => {
    const inputValue = inputRef.current.value
    const newData = { id: uuid(), title: inputValue}
    setListData(prevValues => [newData, ...prevValues])
    handlePost(newData)
    inputRef.current.value = ""
  }

  const handleClick = () => {
      handleAdd()
  }

  const handleKeyDown = (e) => {
    if(e.key === "Enter") {
      handleAdd()
    }
  }
   

  return (
    <div className="input-container">
        <input id="input" type="text" placeholder="Write something here..." ref={inputRef} onKeyDown={handleKeyDown}/>
        <button id="add" onClick={handleClick}>
          <svg
            height="426.66667pt"
            viewBox="0 0 426.66667 426.66667"
            fill="white"
            fontWeight="normal"
            width="426.66667pt"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0"></path>
          </svg>
        </button>
      </div>
  )
}

export default Input