import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import Item from './Item';
import { db, storage } from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
export default function Home() {
    var categories = ["phone", "Id Card", 'Bag', 'Notebook'];
    var selectionCat = [true, false, true, true];
    const history = useHistory();
    var user ='';
    var [Items, setItems] = useState([]);
    const storage = getStorage();
    useEffect(async () => {
        user=localStorage.getItem('user');
        db.collection("Items").onSnapshot((snapshot) => {
            setItems(snapshot.docs.map((doc) => ({
                itemName: doc.data().itemName,
                //    date:doc.data().Date,
                photo: doc.data().photo,
                description: doc.data().description,
                phone: doc.data().phone,
                user:doc.data().postBy,
            })
            ))
        })
    }, [])
    var [upload, setUpload] = useState(`url(Images/upload.png)`);
    var [image, setImage] = useState();
    const sendPost = (e) => {
        e.preventDefault();
        // console.log(e.)
        let name = document.getElementById('item_name').value;
        let desc = document.getElementById('description').value;
        let phno = document.getElementById('phno').value;
        //nuv name ichinav id ivvale code lo l8 le adhi oka unique dhi field generate chestundhi kadha ,, aa feild unique undhi ga}
        if (name.length > 2 && desc.length > 3 && phno.length == 10) {
            //ikada
            const storageRef = ref(storage, '/Images/' + phno+new Date());

            // 'file' comes from the Blob or File API
            const uploadTask = uploadBytes(storageRef, image).then((snapshot) => {
                console.log(snapshot);
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    document.getElementsByClassName("PostItem")[0].style.display = 'none' ;
                    db.collection("Items").add({
                        postBy: localStorage.getItem('user'),
                        itemName: name,
                        description: desc,
                        photo: downloadURL,
                        phone: phno,
                        timestamps: new Date(),
                    })
                });
            });
        }
        else {
            document.getElementsByClassName('warning')[0].innerHTML = 'Enter A Valid Information'
            setInterval(function () { document.getElementsByClassName('warning')[0].innerHTML = '' }, 3000);
        }
    }
    var [loading,setload]=useState(true);
   async function fun(en){
        const citiesRef = db.collection('Items');
        const snapshot = await citiesRef.where('itemName', '==', en).get();
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }  
        snapshot.docs.length>1?
        setItems(snapshot.docs.map((doc) => ({
            itemName: doc.data().itemName,
            //    date:doc.data().Date,
            photo: doc.data().photo,
            description: doc.data().description,
            phone: doc.data().phone,
            user:doc.data().postBy,
        })
        )):alert("No Products Found")
    }
   async function fune(){
        let str=document.getElementById("Search").value;
        const citiesRef = db.collection('Items');
        const snapshot = await citiesRef.where('itemName', '==', str).get();
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }  
        snapshot.docs.length>1?
        setItems(snapshot.docs.map((doc) => ({
            itemName: doc.data().itemName,
            //    date:doc.data().Date,
            photo: doc.data().photo,
            description: doc.data().description,
            phone: doc.data().phone,
            user:doc.data().postBy,
        })
        )):alert("No Products Found")
    }
    return (
        <div className='Home' >
            <div className='NavThop'>
                <div className='nav'>
                    <div><input id='Search' placeholder='Search Your Item'></input><i onClick={()=>{fune()}} class="fas fa-search"></i></div>
                    <div onClick={()=>{document.getElementsByClassName("PostItem")[0].style.display='block'}}  className='Post'>Post</div>
                </div>
            </div>
            {/* {loading?<div className='load'> <div class="lds-hourglass"></div></div>:<></>} */}
            <div className='categories'>
                {categories.map((cat, ind) => {
                    return <div onClick={()=>fun(cat)} style={{ backgroundColor: selectionCat[ind] ? 'white' : 'rgba(0, 0, 0, 0.056)' }}><i class="fas fa-hashtag"></i> &emsp;{cat}</div>
                })}
            </div>
            <div className='PostItem'>
                <div style={{ width: '100%', textAlign: 'end' }}>
                    <i onClick={() => { document.getElementsByClassName("PostItem")[0].style.display = 'none' }} class="fas fa-times"></i>
                </div>
                <div className='postinput'>
                    <form>
                        {/* <img src={upload} /> */}
                        <div className="warning"></div>
                        <input accept="image/png, image/jpeg" className='uploading'
                            onChange={(event) => { setImage(event.target.files[0]); setUpload("url(" + URL.createObjectURL(event.target.files[0]) + ")") }}
                            style={{ backgroundImage: upload, backgroundColor: 'none' }} type="file" required />
                        <input id='item_name' placeholder="Item name" required />
                        <textarea name='desc' rows='5' cols='25' id='description' placeholder="Description" required></textarea>
                        <input id='phno' type="tel" pattern="[0-9]{10}" placeholder="Founder Contact number" required />
                        <br/><button type="submit" onClick={sendPost}>Submit</button>
                    </form>
                </div>
            </div>
            <div className='List'>
                {Items.map((item) => {
                    return <Item
                        user={item.user}
                        name={item.itemName}
                        description={item.description}
                        photo={item.photo}
                        phone={item.phone}
                    />
                })}
            </div>
        </div>
    )
}
