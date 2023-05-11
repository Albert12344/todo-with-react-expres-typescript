import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function Todo() {
  const [todos, setTodos] = useState('')
  const [getTodos, setGetTodos] = useState<{ _id: string; todos: string }[]>([]);
  const [index, setIndex] = useState(0)


  function handleClick() : void {
    setTodos(todos)
    setIndex(index + 1)

    axios.post('http://localhost:8000/todo', {"todos": todos, "index": index})
    .then(response => {
      console.log(response.data);
      // Handle the response data
    })
    .catch(error => {
      console.error(error);
      // Handle the error
    });
  }

  useEffect(() => {
    axios.get('http://localhost:8000/gettodo')
    .then(response => {
      setGetTodos(response.data);
      console.log(response.data)
    })
    .catch(error => {
      console.error(error);
      // Handle the error
    });
  }, [handleClick])

  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:8000/deletetodo/${id}`)
      .then(() => {
        setIndex(index - 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='motherDiv'>
      <h2>Little Todo Application</h2>
      <div className='inputDiv'>
        <input className='input' type="text" name="" id="" placeholder='What I will do...' onChange={(e) => {setTodos(e.target.value)}}/>
        <input className='submit' type="submit" name="" id="" onClick={handleClick}/>
      </div>
      {getTodos.map(todo => {
        return <div className='todoDiv'>
            <p key={index}>{todo.todos}</p>
            <div>
              <button onClick={() => handleDelete(todo._id)}>Delete</button>
            </div>
        </div>
      })}
    </div>
  )
}
