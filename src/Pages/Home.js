import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import Item from './Item';
import { db, storage } from '../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
export default function Home() {
    var categories = ["bag", "idCard", 'LunchBox', 'MobilePhone'];
    var selectionCat = [true, false, true, true];
    const history = useHistory();
    var user ='';
    var [Items, setItems] = useState([]);
    const storage = getStorage();
    useEffect(() => {
        user=localStorage.getItem('user');
        db.collection("Items").onSnapshot((snapshot) => {
            setItems(snapshot.docs.map((doc) => ({
                itemName: doc.data().itemName,
                //    date:doc.data().Date,
                photo: doc.data().photo,
                description: doc.data().description,
                phone: doc.data().phone,
                // user:doc.data().postBy,
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
                    db.collection("Items").add({
                        postBy: user,
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
    return (
        <div className='Home' >
            <div className='categories'>
                {categories.map((cat, ind) => {
                    return <div style={{ backgroundColor: selectionCat[ind] ? 'white' : 'rgba(0, 0, 0, 0.056)' }}>{cat}{selectionCat[ind] ? <i class="fas fa-times"></i> : <></>}</div>
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
                        <input type="submit" onClick={sendPost} />
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
