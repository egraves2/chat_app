import NamePicker from './namePicker.js';
import React, {useState, useEffect} from 'react';
import './App.css';
import {db, useDB} from './db'
import {BrowserRouter, Route} from 'react-router-dom'


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
  const messages = useDB(room)

  return <main>

    <header> 
    
      { // <img className="menu"
        // alt="menu"
        //  src="https://i.ibb.co/nRJWZFM/2044284-512.png"
        // />
      }
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
    {messages.map((m,i)=> {
      return <div key={i} className="message-wrap"
        from={m.name===name?'me':'you'}>
        <div className="message">
          <div className="msg-name">{m.name}</div>
          <div className="msg-text">{m.text}</div>
          </div>
      </div>
    })}
   </div>

    <TextInput onSend={(text)=>{
      db.send({
        text, name, ts: new Date(), room
      })
    }}/>
  </main>
}

function TextInput(props){
  var [text, setText] = useState('') 
  return <div className="text-input">
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
