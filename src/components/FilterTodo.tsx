import Button from "./Button";
import { Filters } from "../types/todo";
import { useTodoStore } from "../stores/Todo";

function FilterTodo() {
  const filter = useTodoStore((state) => state.filter);
  const setFilter = useTodoStore((state) => state.setFilter);

  const isActiveButton = (filterText: Filters) => filter === filterText;

  const handleFilter = (filterText: Filters) => setFilter(filterText);

  return (
    <ul className="flex items-center gap-2 my-5">
      <li>
        <Button
          text="All"
          active={isActiveButton("all")}
          onClick={() => handleFilter("all")}
        />
      </li>
      <li>
        <Button
          text="ToDo"
          active={isActiveButton("todo")}
          onClick={() => handleFilter("todo")}
        />
      </li>
      <li>
        <Button
          text="Done"
          active={isActiveButton("done")}
          onClick={() => handleFilter("done")}
        />
      </li>
    </ul>
  );
}

export default FilterTodo;
