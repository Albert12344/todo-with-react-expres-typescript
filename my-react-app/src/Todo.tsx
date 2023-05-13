import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface TodoInterface {
  _id: string;
  text: string;
  status: boolean;
}

export default function Todo() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [checkedTodoId, setCheckedTodoId] = useState('');
  const [editedTodoId, setEditedTodoId] = useState('');
  const [editedTodoText, setEditedTodoText] = useState('');

  async function handleClick() {
    setTodo('');

    try {
      const response = await axios.post('http://localhost:8000/todos', {
        text: todo,
        status: false
      });

      if (response.data.status === 200) {
        const newTodo = response.data.todo;
        setTodos(prevTodos => [...prevTodos, newTodo]);
      }
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:8000/todos/${id}`);
      if (response.data.status === 200) {
        setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
      }
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };

  const handleCheckboxChange = (id: string) => {
    if (id === checkedTodoId) {
      setCheckedTodoId('');
    } else {
      setCheckedTodoId(id);
    }
  };

  const handleEditClick = (id: string, text: string) => {
    setEditedTodoId(id);
    setEditedTodoText(text);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTodoText(event.target.value);
  };

  const handleSave = async (id: string) => {
    if (id === editedTodoId) {
      try {
        const response = await axios.put(`http://localhost:8000/todos/${id}`, { text: editedTodoText });
        if (response.data.status === 200) {
          setTodos(prevTodos =>
            prevTodos.map(todo =>
              todo._id === id ? { ...todo, text: editedTodoText } : todo
            )
          );
          setEditedTodoId('');
          setEditedTodoText('');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => { 
    axios.get('http://localhost:8000/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error(error);
        // Handle the error
      });
  }, [handleClick, handleDelete, handleSave]);

  return (
    <div className='motherDiv'>
      <h2>Little Todo Application</h2>
      <div className='inputDiv'>
        <input className='input' type='text' name='' id='' placeholder='What I will do...' value={todo} onChange={(e) => setTodo(e.target.value)}/>
        <input className='submit' type="submit" onClick={handleClick} />
      </div>
      {todos.map(todo => (
        <div className='motherTodo' key={todo._id}>
          {editedTodoId === todo._id ? (
            <div className='todoDiv'>
              <input className='editingText' type="text" value={editedTodoText} onChange={handleInputChange} autoFocus/>
              <h3 onClick={() => handleSave(todo._id)}>Save</h3>
              <div className='crud'>
                <img src="edit.png" alt="" onClick={() => handleEditClick(todo._id, todo.text)}/>
                <h2 onClick={() => handleDelete(todo._id)}>X</h2>
                <input className='checkbox' type="checkbox" checked={checkedTodoId === todo._id} onChange={() => handleCheckboxChange(todo._id)} />
                <h3>Done</h3>
              </div>
            </div>
          ) : (
            <div className='todoDiv'>
              <p>{todo.text}</p>
              <div className='crud'>
                <img src="edit.png" alt="" onClick={() => handleEditClick(todo._id, todo.text)}/>
                <h2 onClick={() => handleDelete(todo._id)}>X</h2>
                <input className='checkbox' type="checkbox" checked={checkedTodoId === todo._id} onChange={() => handleCheckboxChange(todo._id)} />
                <h3>Done</h3>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
