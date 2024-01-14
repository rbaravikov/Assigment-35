import { useContext, useEffect, useState } from "react";
import ListItem from "./ListItem"
import {motion, AnimatePresence} from "framer-motion";
import TodosContext from "../contexts/TodosContext";

const List = () => {
  const {listData} = useContext(TodosContext)
  const [isRenderList, setIsRenderList] = useState(false)

  const listAnimation = { 
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.3
      }
    }
  }

  const itemAnimation = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  useEffect(() => {
    setIsRenderList(true);
  }, []);

  return (
    <motion.ul 
      variants={listAnimation} 
      initial='hidden' 
      animate={isRenderList ? "visible" : "hidden"} 
      id="todo">
        <AnimatePresence>
          {listData.map((item) => (
            <ListItem 
              item={item.title} 
              id={item.id}
              key={item.id}
              itemAnimation={itemAnimation}
              motion={motion}
            />
          ))}
      </AnimatePresence>
  </motion.ul>
  )
}

export default List