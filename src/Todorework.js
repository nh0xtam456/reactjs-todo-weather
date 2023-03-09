import "./App.css";
import { useState } from "react";
import { set } from "lodash";

const initTodos = [
        {id:1,thing:'Finish the core',completed:true},
        {id:2,thing:'Make a new example',completed:true},
        {id:3,thing:'Make plan for new example',completed:false},
        {id:4,thing:'Cooking',completed:true},
        {id:5,thing:'Have segs with anime girl',completed:false },
    
]

function FilterButton({ action, title, isActive }) {
    const style = isActive ? { border: '1px solid back', color: 'yellow', backgroundColor: 'black' } : {}
    return (
      <button style={style} onClick={action}>{title}</button>
    )
  }
  

const ThanhPhanTodo = ({completed,thing,id,toogleCheckbox,Deletene}) => {
    return (
        <tr>
            <td><input type='checkbox' checked={completed} onChange={(e) => toogleCheckbox(id)}/>
                
            </td>
            <td>{thing}</td>
            <td><button href="" onClick={(e) => Deletene(id)}>Delete</button></td>
        </tr>
    )
}

const Addtodo = ({addtodo,setaddtodo,newarray}) => {
    return (
        <div className="addtodo">
            <input type='text' placeholder='To Do...' className="inputaddtodo" value={addtodo} onChange={(e)=>{
                setaddtodo(e.target.value)
            }}/>
            <button type='submit' className="buttontodo" onClick={(e) => newarray(addtodo)}>Add</button>
        </div>
    )
}

const TodoList = ({todos,toogleCheckbox,Deletene,}) => {
    const rows= []
    todos.forEach((todo) => {
        rows.push(
            <ThanhPhanTodo 
                key={todo.id}
                id={todo.id}
                thing={todo.thing}
                completed={todo.completed}
                toogleCheckbox={toogleCheckbox}
                Deletene={Deletene}
            />
        )
    })
    return(
        <div className="divtablene"> 
            <table className='tablene'>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}

function FilterAction({ filter, setFilter }) {
    return (
      <div style={{ margin: 10, display: 'flex', width: 170, justifyContent: 'space-between' }}>
        <FilterButton title={'all'} action={() => setFilter('all')} isActive={filter === 'all'} />
        <FilterButton title={'done'} action={() => setFilter('done')} isActive={filter === 'done'} />
        <FilterButton title={'undone'} action={() => setFilter('undone')} isActive={filter === 'undone'} />
      </div>
    )
  }
  
  

function App() {
    const [todos,setTodos] = useState(initTodos)
    const [addtodo,setaddtodo] = useState('')
    const [filter, setFilter] = useState('all')
    const toogleCheckbox = (id) =>{
        let newarray =[...todos]
        newarray.forEach(newarries =>{
            if(newarries.id===id)
            {
                newarries.completed=!newarries.completed
            }
        })
        setTodos(newarray)
    }
    const newarray = (text) =>{
        let newarray = [...todos]
        const arrayex={
            id:newarray.length+1,
            thing:text,
            completed:false
        }
        newarray.push(arrayex)
        setTodos(newarray)
        setaddtodo('')
    }
    const Deletene = (id) =>{
        setTodos(todos.filter(todo => todo.id !== id))
    }
    const filteredTodos = todos.filter(todo => {
        if (filter === 'done') return todo.completed
        if (filter === 'undone') return !todo.completed
        return todo
      })
    
    return (
        <div>
            <Addtodo addtodo={addtodo} setaddtodo={setaddtodo} newarray={newarray} />
            <TodoList todos={filteredTodos} toogleCheckbox={toogleCheckbox} setaddtodo={setaddtodo} addtodo={addtodo} Deletene={Deletene}/>
            <FilterAction
                    setFilter={setFilter}
                    filter={filter}
            />

        </div>
    )

}


export default App;
