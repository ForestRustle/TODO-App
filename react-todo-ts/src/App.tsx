import { useMemo, useState } from 'react';
import styles from './App.module.css';
import { TodoForm } from './components/TodoForm/TodoForm';
import { useLocalStorage } from './helpers/useLocalStorage';
import type { FilterType, Todo } from './interface/todo';
import { TodoList } from './components/TodoList/TodoList';

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<FilterType>('all');
  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

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
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </div>
  );
}

export default App;
