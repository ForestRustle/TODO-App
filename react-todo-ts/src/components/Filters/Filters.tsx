import React from 'react';
import type { FiltersProps, FilterType } from '../../interface/todo.interface';
import styles from './Filters.module.css';


export const Filters: React.FC<FiltersProps> = ({
  currentFilter,
  onFilterChange,
  activeCount,
  onClearCompleted,
  hasCompleted,
}) => {
  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'Все' },
    { key: 'active', label: 'Активные' },
    { key: 'completed', label: 'Завершенные' },
  ];

  return (
    <div className={styles.filters}>
      <div className={styles.counter}>
        Осталось задач: <strong>{activeCount}</strong>
      </div>

      <div className={styles.filterButtons}>
        {filters.map(({ key, label }) => (
          <button
            key={key}
            className={`${styles.filterButton} ${
              currentFilter === key ? styles.active : ''
            }`}
            onClick={() => onFilterChange(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {hasCompleted && (
        <button className={styles.clearButton} onClick={onClearCompleted}>
          Очистить завершенные
        </button>
      )}
    </div>
  );
};
