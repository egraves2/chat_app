import NamePicker from './namePicker.js';
import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  const [messages, setMessages] = useState([])
  const [name, setName] = useState('')
  console.log(messages)
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
      return <div key={i} className="message-wrap">
        <div className="message">{m}</div>
      </div>
    })}
   </div>

    <TextInput onSend={m=> setMessages([m, ...messages])}/>
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
