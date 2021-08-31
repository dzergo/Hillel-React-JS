import './App.css';
import api from './utils/api';
import { useState, useEffect } from 'react';
import ToDoList from './Components/ToDoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [dragCoordinate, setDragCoordinates] = useState({
    left: 0,
    top: 0
  });


  useEffect(() => {
    api.get()
    .then(({data}) => setTodos(data))
  }, []);

  function setDone(todo) {
    api.put(`/${todo.id}` , {...todo, isDone: !todo.isDone})
    .then(
      ({data}) =>
       setTodos(todos.map(item => item.id === todo.id ? data : item))
    )
  }

  function removeTodo(todo) {
    api.delete(`/${todo.id}`)
    .then(
      function() {
        setTodos(todos.filter(item => item.id !== todo.id)
        )}
      )
  }

  function saveTodo(e) {
    e.preventDefault();
    api.post("", {
      title,
      isDone: false,
      id: Date.now(),
      date: new Date().toLocaleString(),
      positionX: 0,
      positionY: 0,
      isMoving: false
    })
    .then(({data}) => setTodos([...todos, data]))
  }
  
  function setNotePosition (item, x, y){
    return {
      ...item,
      positionX: item.positionX += x,
      positionY: item.positionY += y
    };
  }

  function onDragStart (e, todo) {
    if(e.target.localName === 'input') {
      setDone(todo);
    }
    else if (e.target.localName === 'button') {
      removeTodo(todo);
    } 
    else {
      setDragCoordinates({
        left: e.pageX,
        top: e.pageY
      })
      
      todo.isMoving = true;

      setTodos(todos.map(item => 
          item.id === todo.id ? todo : item));
      }
  }
  
  function moveLikePointer (e, todo) {

    setTodos(todos.map(item => 
      item.id === todo.id ?
      setNotePosition(
        todo, 
        e.pageX - dragCoordinate.left,
        e.pageY - dragCoordinate.top
        ): item))
      setDragCoordinates({
        left: e.pageX,
        top: e.pageY
      })
  }

  function onDragEnd(e, todo) {
    if(e.target.localName !== 'input' || e.target.localName !== 'button') { 
      api.put(`/${todo.id}` , {
        ...todo, 
        positionX: todo.positionX,
        positionY: todo.positionY,
        isMoving: false
      })
      .then(
        ({data}) =>
          setTodos(todos.map(item => item.id === todo.id ? data : item))
      )
    }
  }
  
   return (
    <form className="App" onSubmit={(e) => saveTodo(e)}>
      <input value={title} onChange={(e) => setTitle(e.target.value)}/>
      <button type="submit" >add</button>
      <ToDoList 
        items={todos}
        setDone={setDone}
        removeTodo={removeTodo}
        onDragStart={onDragStart}
        moveLikePointer={moveLikePointer}
        onDragEnd={onDragEnd}
      />
    </form>
  );
}

export default App;
