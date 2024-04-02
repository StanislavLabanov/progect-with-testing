import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "src/components/Empty";
import { Filter } from "src/components/Filter";
import { List } from "src/components/List";
import { deleteTask, tasksSelector, toggleTask } from "src/store/taskSlice";

export const TaskList = () => {
  const items = useSelector(tasksSelector);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false)
  const [itemsMass, setItemMass] = useState(items)

  useEffect(() => {
    active
      ? setItemMass(prev => prev.filter(el => !el.done))
      : setItemMass(items)
  }, [active, items])

  const handleDelete = (id: Task["id"]) => {
    dispatch(deleteTask(id));
  };

  const handleToggle = (id: Task["id"]) => {
    dispatch(toggleTask(id));
  };

  return (
    items.length > 0
      ?
      <>
        <Filter setActive={setActive} />
        <List items={itemsMass} onDelete={handleDelete} onToggle={handleToggle} />
      </>
      : <Empty />
  )
};
