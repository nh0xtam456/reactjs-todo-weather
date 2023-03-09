import logo from './logo.svg';
import './App.css';
import { last } from 'lodash';
import { useState } from 'react';

const SanPham = ({name, price, stocked}) => (
  <tr>
    <td style={{color: stocked ? 'black': 'red'}}>{name}</td>
    <td>{price}</td>
  </tr>
)

const LoaiSanPham = ({category}) => (
  <tr>
    <th colSpan={2}>{category}</th>
  </tr>
)

const HienThiSanPham = ({products,text, checked}) => {
  const rows = []
  let lastCategory = ''
  products.forEach(product => {
    if(!product.name.includes(text) ) return
    if(checked)
    {
     
    if(!product.stocked==checked) {
      return 
    } 
    }
    // if(product.stocked !=='true') return
    if(product.category !== lastCategory) {
      rows.push(<LoaiSanPham key={product.category} category={product.category} />)
    }

    rows.push(
      <SanPham 
        key={product.name}
        name={product.name} 
        price={product.price} 
        stocked={product.stocked}
      />)
    lastCategory = product.category
  });

  return(
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
        {rows}
      </tbody>
    </table>
  )

}

const ThanhSearch = ({text,setText, checked, setChecked}) => {
  return (
      <form>
          <input placeholder='Search...' value={text} onChange={(e) => setText(e.target.value)}/>
          <br />
          <label>
            <input type='checkbox' checked={checked} onClick={(e) => setChecked(e=!checked)}/>
            {' '}
            in stock only
          </label>
        </form>
  )

}


const TimKiemSanPham = ({products}) => {
 const [text,setText] = useState('')
 const [checked,setChecked] = useState(false)
 
 return( <div className='container'>
    <ThanhSearch text={text} setText={setText} checked={checked} setChecked={setChecked} />
    <HienThiSanPham products={products} text={text} checked={checked}/>
  </div>
 )
}

const products = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

function App() {
  return <TimKiemSanPham products={products}/>
}

export default App;



