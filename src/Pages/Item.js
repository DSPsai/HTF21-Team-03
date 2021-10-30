import React,{useState} from 'react'
export default function Item(props) {
    var [over,setOver]=useState(false);
    var [click,setclick]=useState(false);
    return (
        <div className='box' onMouseOver={()=>{setOver(true)}} onMouseLeave={()=>{setOver(false)}}>
            <div className='Row'>
                <div className='user'>Posted By : {props.user} </div>
                <div className='name'>Item Name : {props.name} </div>
                {/* <div className='photo'>{props.photo}</div> */}
                <img src={props.photo} />
                <div className='desc'>Descrition : {props.description}</div>
                {click?<div className='phone'>Contact No : {props.phone}</div>:<></>}
                {/* <div className='phone'>Contact No : {props.phone}</div> */}
                {over?<div onClick={()=>{click?window.location.href=`tel:${props.phone}`:setclick(true)}} className='itsmine'>{!click?'Its Mine':'Call Now'}</div>:<></>}
            </div>
        </div>
    )
}
