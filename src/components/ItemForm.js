import React, { useState, useEffect, useRef } from 'react';
import database from '../Firebase';
import {ref, push} from 'firebase/database';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const auth = getAuth();
var userId = "0";
>>>>>>> f8b005a098a7a10d215714c8843fea1b117e14d7
function ItemForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });
    if(userId !== "0"){
       pushToDb();
    }
    setInput('');
  };

//watch for user login/logout and update user id accordingly 
  onAuthStateChanged(auth, (user) => {
      if(user) {
         userId = user.uid;
      } else {
         //user is signed out
         userId = "0";
      }
  });
  const pushToDb = () => {
     const db = database;
     push(ref(db, "users/" +userId), {
      id: Math.floor(Math.random() * 10000),
      text: input,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">
      {props.edit ? (
        <>
          <input
            placeholder="Update your item"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="item-input edit"
          />
          <button onClick={handleSubmit} className="item-button edit">
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="Add a item"
            value={input}
            onChange={handleChange}
            name="text"
            className="item-input"
            ref={inputRef}
          />
          <button onClick={handleSubmit} className="item-button">
            Add
          </button>
        </>
      )}
    </form>
  );
}

export default ItemForm;
