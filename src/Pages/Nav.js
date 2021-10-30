import React,{useState} from 'react'
// import Firebase from '../firebase'
export default function Nav() {
    var [over,setOver]=useState(true);
    // const saveToFirebase = Firebase.firestore();
    // saveToFirebase.collection("Items").add({
    //   name: "NAme_1",
    //   date:"24-10-2021" 
    // });
    return (
        <>
            <div className='NavThop'><div onMouseOver={()=>{setOver(true)}} className='Menu'>Menu</div>
                <div className='nav'>
                    <div><input placeholder='Search Your Item'></input><i class="fas fa-search"></i></div>
                    <div onClick={()=>{document.getElementsByClassName("PostItem")[0].style.display='block'}}  className='Post'>Post</div>
                </div>
            </div>
        </>
    )
}
