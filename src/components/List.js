import React, { useState } from 'react';
import ItemForm from './ItemForm';
import Item from './Item';

function ItemList() {
  const [items, setItems] = useState([]);

  const addItem = item => {
    if (!item.text || /^\s*$/.test(item.text)) {
      return;
    }

    const newItems = [item, ...items];

    setItems(newItems);
    console.log(...items);
  };

  const updateItem = (itemId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setItems(prev => prev.map(item => (item.id === itemId ? newValue : item)));
  };

  const removeItem = id => {
    const removedArr = [...items].filter(item => item.id !== id);

    setItems(removedArr);
  };

  const completeItem = id => {
    let updatedItem = items.map(item => {
      if (item.id === id) {
        item.isComplete = !item.isComplete;
      }
      return item;
    });
    setItems(updatedItem);
  };

  return (
    <>
      <h1>What would you like to copy?</h1>
      <ItemForm onSubmit={addItem} />
      <Item
        items={items}
        completeItem={completeItem}
        removeItem={removeItem}
        updateItem={updateItem}
      />
    </>
  );
}

export default ItemList;