import { useContext, useEffect, useRef, useState } from "react";
import TodosContext from "../contexts/TodosContext";

const ListItem = ({ item, id, motion, itemAnimation }) => {
    const [editMode, setEditMode] = useState(false)
    const [itemText, setItemText] = useState(item)
    const inputRef = useRef(null);
    const {listData, setListData} = useContext(TodosContext)

    const handleRemove = () => {
      const newListData = listData.filter(data => data.id !== id)
      handleDelete(id)
      setListData(newListData);
    };

      
    const handleDelete = async (id) => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
          method: 'DELETE',
        })
        const responseData = await response.json()
        console.log(responseData)
      } catch (error) {
        console.error(error)
      }
    };
    
    const handlePatch = async (newListData) => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${newListData[id]}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: newListData[id].value }),
        })
  
        const responseData = await response.json();
        console.log(responseData)
      } catch (error) {
        console.error(error)
      }
    }
  
    const handleEdit = () => {
        setEditMode(!editMode)
    };
    
      
    const handleChange = (e) => {
        setItemText(e.target.value)
    };

    const handleKeyDown = (e) => {
        if(e.key === "Enter"){
            const newListData = [...listData];
            newListData[id] = {value: e.target.value};
            // setListData(newListData);
            handlePatch(newListData);
            setEditMode(false);
        }
    }

    useEffect(() => {
        if (editMode) {
          inputRef.current.focus();
        }
      }, [editMode]);
  
    return (
      <motion.li className="list-item" variants={itemAnimation} layout="position">
        <div className={editMode ? "text hidden" : "text"} >{itemText}</div>
        <textarea ref={inputRef} onChange={handleChange} onKeyDown={handleKeyDown} className={editMode ? "" : "hidden"} type="text" value={itemText} />
        <div className="buttons">
            <button className="edit" onClick={handleEdit}>
                <i className="fa-solid fa-edit"></i>
            </button>
            <button className="remove" onClick={handleRemove}>
                <i className="fa-solid fa-trash"></i>
            </button>
        </div>
      </motion.li>
    );
  };
  
  export default ListItem;
  