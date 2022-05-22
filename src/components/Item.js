import React, { useState } from "react";
import ItemForm from "./ItemForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit, TiClipboard } from "react-icons/ti";

const Items = ({ items, completeItems, removeItem, updateItem }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateItem(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <ItemForm edit={edit} onSubmit={submitUpdate} />;
  }

  return items.map((item, index) => (
    <div
      onClick={() => navigator.clipboard.writeText(item.text)}
      className={item.isComplete ? "item-row complete" : "item-row"}
      key={index}
    >
      <div key={item.id} onClick={() => completeItems(item.id)}>
        {item.text}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeItem(item.id)}
          className="delete-icon"
          size={30}
        />
        <TiEdit
          onClick={() => setEdit({ id: item.id, value: item.text })}
          className="edit-icon"
          size={30}
        />
        <TiClipboard
          onClick={() => navigator.clipboard.writeText(item.text)}
          classNmae="copy-icon"
          size={30}
        />
      </div>
    </div>
  ));
};

export default Items;
