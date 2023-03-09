import "./App.css";
import { useState } from "react";
import { set } from "lodash";

const ThanhPhanTodo = ({
  setaddtodo,
  value,
  thing,
  addtodo,
  newtodo,
  index,
  setChecked,
  toogleCheckbox,
  newarray
}) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => toogleCheckbox(index)}
        />
      </td>
      <td>{thing}</td>
    </tr>
  );
};

const ThemToDo = ({ addtodo, setaddtodo,newarray }) => {
  return (
    <div>
      <input type="text" placeholder="To Do..." value={addtodo} onChange={(e) => setaddtodo(e.target.value)}   />
      <button type="submit" onClick={(e) => newarray(addtodo)}>Add</button>
    </div>
  );
};

const ToDoList = ({ todos, addtodo,toogleCheckbox,setFilter }) => {
  const row = [];
  todos.forEach((todo) => {
    if(setFilter==='complete')
    {
        row.push(
            <ThanhPhanTodo
            key={todo.index}
            index={todo.index}
            value={todo.value}
            thing={todo.thing}
            toogleCheckbox={toogleCheckbox}
          />
        )
        return
    }
    if(setFilter==='incomplete')
    {
        row.push(
            <ThanhPhanTodo
            key={todo.index}
            index={todo.index}
            value={false}
            thing={todo.thing}
            toogleCheckbox={toogleCheckbox}
          />
        )
        return
    }
    row.push(
      <ThanhPhanTodo
        key={todo.index}
        index={todo.index}
        value={todo.value}
        thing={todo.thing}
        toogleCheckbox={toogleCheckbox}
      />
    );
  });

  return (
    <div className="todo">
      <table className="table1">
        <tbody>{row}</tbody>
      </table>
    </div>
  );
};

const TodoFilter = (props) => {
console.log(props)
    return(
  <div>
    <label> Filter</label>
    <div className="form">
      <span href="">All</span>
      <span href="" onClick={(e) => props.setFilter('complete')}>Complete</span>
      <span href="" onClick={(e) => props.setFilter('incomplete')}>Incomplete</span>
    </div>
  </div>)
}

const initTodos = [
  { index: 1, value: false, thing: "Make a todo list" },
  { index: 2, value: true, thing: "Check random a task" },
  { index: 3, value: true, thing: "Make a wireframe" },
  { index: 4, value: false, thing: "Finish the core" },
  { index: 5, value: false, thing: "Make a new example" },
  { index: 6, value: false, thing: "Make plan for new example" },
];

const newtodo = [{ index: null, value: null, thing: null }];

function App() {
  const [addtodo, setaddtodo] = useState("");
  const [value, setChecked] = useState(false);  
  const [todos,setTodos] = useState(initTodos);
  const [filter,setFilter] = useState('All')
  const toogleCheckbox = (id) => {
    let newarray = [...todos]
    newarray.forEach(newarries => {
        if(newarries.index===id)
        {
            newarries.value=!newarries.value
        }
        
    })
    setTodos(newarray)
  }
  const newarray = (text) => {
    let newarray = [...todos]
    const arrayex = {
        index:newarray.length+1,
        value:false,
        thing:text
    }
    
    newarray.push(arrayex)
    setTodos(newarray)
    setaddtodo('')
  }
  
  

  return (
    <div>
      <ThemToDo addtodo={addtodo} setaddtodo={setaddtodo} newarray={newarray} />
      <ToDoList
        todos={todos}
        addtodo={addtodo}
        setaddtodo={setaddtodo}
        value={value}
        setChecked={setChecked}
        toogleCheckbox={toogleCheckbox}
        setFilter={setFilter}
      />
      <TodoFilter filter={filter} setFilter={setFilter}/>
    </div>
  );
}

export default App;
