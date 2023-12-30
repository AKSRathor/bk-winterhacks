import React from 'react'
import { useEffect } from 'react'
import { useState, useRef } from 'react'

const noti = {
    head:"Request accepted",
    paraNoti:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum impedit itaque maxime. Aut sequi, quibusdam nam mollitia unde laboriosam! Vero cupiditate, itaque sed laborum atque, ipsam corrupti iste impedit accusantium eaque odit. Vel perspiciatis consectetur magnam mollitia eius expedita laudantium possimus, harum iusto eveniet laborum. Tempore ea perspiciatis nobis aliquam!asdfasdf consectetur adipisicing elit. Harum impedit itaque maxime. Aut sequi, quibusdam nam mollitia unde laboriosam! Vero cupiditate, itaque sed laborum atque, ipsam corrupti iste impedit accusantium eaque odit. Vel perspiciatis consectetur magnam mollitia eius expedita laudantium possimus, harum iusto eveniet laborum. Tempore e"
}


const NotificationCard = (props) => {
    useEffect(() => {
        setParaNotiState(props.i.paraNoti.slice(0,300))
          if(props.i.paraNoti.length >300){
            setParaNotiState(props.i.paraNoti.slice(0,300)+"...")
            setNeedToShowMore(true)
          } 
          else{
            setParaNotiState(props.i.paraNoti.slice(0,300))
          }
    
      return () => {
        
      }
    }, [])
    const showMoreI = useRef()

    const handleOnClickMoreShow = ()=>{
      // if(isShownMore){
        showMoreI.current.style.transform += `rotateZ(180deg)`
        if(!isShownMore){
          setParaNotiState(props.i.paraNoti)
          setIsShownMore(true)

        }
        else{
          setParaNotiState(props.i.paraNoti.slice(0,300)+"...")
          setIsShownMore(false)

        }
      // }
    }
    const [isShownMore, setIsShownMore] = useState(false)
    const [paraNotiState, setParaNotiState] = useState("fetching...")
    const [needToShowMore, setNeedToShowMore] = useState(false)
  return (
    <div className='noti'>
        <div className="headNoti"><h2>{props.i.head}</h2></div>
        <div className="paraNoti">{paraNotiState}</div>
        {needToShowMore && <div className="moreBtnDiv"><button onClick={handleOnClickMoreShow} className="moreBtn"><i class="moreDivInsideBtn fa-solid fa-caret-down" ref = {showMoreI} ></i></button></div>}
    </div>
  )
}

export default NotificationCard