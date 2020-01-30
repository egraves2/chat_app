import NamePicker from './namePicker.js';
import React, {useState, useEffect} from 'react';
import './App.css';
import {db, useDB} from './db'
import {BrowserRouter, Route} from 'react-router-dom'
import {FiSend, FiCamera} from 'react-icons/fi'
import * as firebase from "firebase/app"
import Camera from 'react-snap-pic'
import "firebase/storage"
import "firebase/firestore"


function App(){
  useEffect(()=>{
    const {pathname} = window.location
    if(pathname.length<2) window.location.pathname='home'
  }, [])
  return <BrowserRouter>
    <Route path="/:room" component={Room}/>
  </BrowserRouter>
}

function Room(props) {
  // const [messages, setMessages] = useState([])
  const {room} = props.match.params
  const [name, setName] = useState('')
  const[showCamera, setShowCamera] = useState(false)
  const messages = useDB(room)
  
  // await means you wait for one line of code to run before running the next
  async function takePicture(img){
    setShowCamera(false)
    const imgID = Math.random().toString(36).substring(7)
    var storageRef = firebase.storage().ref()
    var ref = storageRef.child(imgID + '.jpg')
    await ref.putString(img, 'data_url')
    db.send({ 
      img: imgID, name, ts: new Date(), room 
    })
  }

  return <main>
    {showCamera && <Camera takePicture={takePicture} />}

    <header> 
      <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
      <img className="logo"
        src="https://i.ibb.co/TrPw6G9/Char-Get-To-Know-Batman80-5ca54cb83a27a6-53173051.png"
      />
      BatChat
      </div>
      <div style={{display:'flex'}}>
      <NamePicker onSave={setName}/>
      </div>
    </header>
    <div className="messages">
      {messages.map((m,i)=> <Message key={i} m={m} name={name}/>)}
   </div>

    <TextInput 
      showCamera={()=>setShowCamera(true)}
      onSend={(text)=> {
        db.send({
          text, name, ts: new Date(), room
        })
      }}
    />

    
  </main>
}

const bucket = 'https://firebasestorage.googleapis.com/v0/b/chatappproject2020.appspot.com/o/'
const suffix = '.jpg?alt=media'

function Message({m, name}) {
  return <div className="message-wrap"
    from={m.name===name?'me':'you'}>
    <div className="message">
      <div className="msg-name">{m.name}</div>
      <div className="msg-text">
        {m.text}
      {m.img && <img src={bucket+m.img+suffix} alt="pic"/>}
      </div>
    </div>
  </div>
}


function TextInput(props){
  var [text, setText] = useState('') 
  return <div className="text-input">
    <button onClick={props.showCamera}
      style={{position: 'absolute', left:0, top:10}}>
      <FiCamera style={{height:15, width:15}} />
    </button>
    <input className="text-field" value={text}
      placeholder ="write your message"
      onChange={e=> setText(e.target.value)}
      onKeyPress={e=> {
        if(e.key==='Enter') {
          if(text) props.onSend(text)
          setText('')
        }
      }}
    />
    <button className="button" onClick={()=> {
      if(text) {
      props.onSend(text)
      
      setText('')
    }}}>
      <img className="icon" src="https://cdn0.iconfinder.com/data/icons/superglyph-communication/30/message-sending-512.png" />
    </button>
  </div>
}




export default App;
