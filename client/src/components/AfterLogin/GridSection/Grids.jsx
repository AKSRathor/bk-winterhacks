import React from 'react'
import { useContext, useRef } from 'react'
import HackContext from '../../../Context/HackContext'
import "./Grids.css"

const Grids = () => {
  const context = useContext(HackContext)
  const { isGrid, setIsGrid } = context
  const gridBtn = useRef()
  const listBtn = useRef()

  
  const handleOnGridChange  =()=>{
    setIsGrid(true)
    gridBtn.current.style.color = "rgb(143, 238, 255)"
    listBtn.current.style.color = "rgb(255, 255, 255)"
  }

  const handleOnListChange = ()=>{
    setIsGrid(false)
    listBtn.current.style.color = "rgb(143, 238, 255)"
    gridBtn.current.style.color = "rgb(255, 255, 255)"
  }

  return (
    <div className='gridsPart'>
      <div className="gridViewCerti"><button ref={listBtn} onClick={handleOnListChange} className=" listCertiBtn"><i class="fa-solid fa-list"></i></button></div>
      <div className="listViewCerti"><button ref={gridBtn} onClick={handleOnGridChange} className="gridCertiBtn"><box-icon  color={isGrid ? 'rgb(143, 238, 255)' : 'white'} type='solid' name='grid-alt'></box-icon></button></div>
    </div>
  )
}

export default Grids