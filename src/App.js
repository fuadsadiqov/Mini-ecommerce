import { useEffect, useState } from 'react'
import DataItem from './components/DataItem'
import Basket from './components/Basket'
import { RxHamburgerMenu } from 'react-icons/rx'

export default function App() {

  const [array, setArray] = useState([])
  const [basket, setBasket] = useState([])
  const [price, setPrice] = useState(6000)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => setArray(Object.entries(data)))
    .catch(error => {
      console.log(error)
    })
  }, [])
  const toggleOpen = () => {
    setOpen(!open)
  }
  return (
    <div className='bg-black'>
      <header className='header text-black w-full py-3 flex justify-between px-6 text-lg fixed bg-white'>
          <b>Total money: ${price}</b>
          <RxHamburgerMenu className='pt-1 text-2xl cursor-pointer' onClick={toggleOpen} />
      </header>
      <Basket setBasket={setBasket} setOpen={setOpen} open={open} basket={basket}/>
      <ul className='pt-20 grid  grid-cols-3'>
        {array.map((item, index) => {
          return <DataItem basket={basket} setBasket={setBasket} price={price} key={index} index={index} item={item} setPrice={setPrice}/>
        })}      
      </ul>
    </div>
  )
}
