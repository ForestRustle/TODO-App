import React, { useState } from 'react';
import styles from './TodoForm.module.css';
interface TodoFormProps {
  onAdd: (text: string) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
		<form className={styles['todo-form']}
			 onSubmit={handleSubmit}>
      <div className={styles['input-group']}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Что нужно сделать?"
          className="todo-input"
        />
        <button type="submit" className={styles['add-button']} disabled={!text.trim()}>
          Добавить
        </button>
      </div>
    </form>
  );
};
