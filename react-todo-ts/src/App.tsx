import { useState } from 'react';
import styles from './App.module.css';
import { TodoForm } from './components/TodoForm/TodoForm';
import { useLocalStorage } from './helpers/useLocalStorage';
import type { FilterType, Todo } from './interface/todo';

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<FilterType>('all');

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
    };
    setTodos([...todos, newTodo]);
  };


  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles['header-headling']}>Todo List</h1>
        <p>Организуйте свои задачи эффективно</p>
      </header>
      <TodoForm onAdd={addTodo}></TodoForm>
    </div>
  );
}

export default App;
