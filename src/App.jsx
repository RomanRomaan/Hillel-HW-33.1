import { useState } from 'react';

export default function App() {
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  function addItem() {
    const trimmed = value.trim();
    if (!trimmed) {
      setError('Поле не может быть пустым');
      return;
    }
    setItems(prev => [...prev, { id: Date.now(), text: trimmed, done: false }]);
    setValue('');
    setError('');
  }

  function toggleItem(id) {
    setItems(prev => prev.map(it => it.id === id ? { ...it, done: !it.done } : it));
  }

  function removeItem(id) {
    setItems(prev => prev.filter(it => it.id !== id));
  }

  return (
    <div style={{ maxWidth: 520, margin: '24px auto', fontFamily: 'system-ui' }}>
      <h1 data-cy="title">TODO</h1>

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          data-cy="input"
          placeholder="Новая задача…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button data-cy="add-btn" onClick={addItem}>Добавить</button>
      </div>

      {error && (
        <p data-cy="error" role="alert" style={{ color: 'crimson' }}>
          {error}
        </p>
      )}

      <ul data-cy="list" style={{ listStyle: 'none', padding: 0, marginTop: 12 }}>
        {items.map(item => (
          <li
            key={item.id}
            data-cy="item"
            style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '6px 0' }}
          >
            <input
              data-cy="item-checkbox"
              type="checkbox"
              checked={item.done}
              onChange={() => toggleItem(item.id)}
            />
            <span
              data-cy="item-text"
              style={{ flex: 1, textDecoration: item.done ? 'line-through' : 'none' }}
            >
              {item.text}
            </span>
            <button data-cy="item-del" onClick={() => removeItem(item.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
