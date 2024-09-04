import create from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Filters, Todo } from "../types/todo";

interface TodoStore {
  todos: Todo[];
  filteredTodos: Todo[];
  filter: Filters;
  addTodo: (text: string) => void;
  updateTodo: (data: Partial<Todo>) => void;
  removeTodo: (id: string) => void;
  setFilter: (filter: Filters) => void;
  applyFilter: (updatedTodos: Todo[], filter: Filters) => Todo[];
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  filteredTodos: [],
  filter: "all",

  addTodo: (text: string) => {
    set((state) => {
      const newTodo = { id: uuidv4(), text, isComplete: false };
      const updatedTodos = [...state.todos, newTodo];
      return {
        todos: updatedTodos,
        filteredTodos: get().applyFilter(updatedTodos, state.filter),
      };
    });
  },

  updateTodo: (payloadUpdateData: Partial<Todo>) => {
    set((state) => {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === payloadUpdateData.id) {
          return {
            ...todo,
            text: payloadUpdateData.text ?? todo.text,
            isComplete: payloadUpdateData.isComplete ?? todo.isComplete,
          };
        }
        return todo;
      });

      return {
        todos: updatedTodos,
        filteredTodos: get().applyFilter(updatedTodos, state.filter),
      };
    });
  },

  removeTodo: (id: string) => {
    set((state) => {
      const updatedTodos = state.todos.filter((todo) => todo.id !== id);
      return {
        todos: updatedTodos,
        filteredTodos: get().applyFilter(updatedTodos, state.filter),
      };
    });
  },

  setFilter: (filter: Filters) => {
    set((state) => ({
      filter,
      filteredTodos: get().applyFilter(state.todos, filter),
    }));
  },

  applyFilter: (todos: Todo[], filter: Filters) => {
    switch (filter) {
      case "done":
        return todos.filter((todo) => todo.isComplete);
      case "todo":
        return todos.filter((todo) => !todo.isComplete);
      case "all":
      default:
        return todos;
    }
  },
}));
