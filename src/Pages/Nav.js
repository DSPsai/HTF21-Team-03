import React,{useState,useEffect} from 'react'
// import Firebase from '../firebase'
export default function Nav() {
    var [over,setOver]=useState("");
    // const saveToFirebase = Firebase.firestore();
    // saveToFirebase.collection("Items").add({
    //   name: "NAme_1",
    //   date:"24-10-2021" 
    // });
    useEffect(() => {
        over=localStorage.getItem('user');
    }, [])
    return (
        <>
        </>
    )
}
