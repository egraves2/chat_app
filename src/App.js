import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return <main>

    <header> 
      <img className="menu"
        alt="menu"
        src="https://i.ibb.co/nRJWZFM/2044284-512.png"
      />
      <img className="logo"
        alt="picture"
        src="https://i.ibb.co/TrPw6G9/Char-Get-To-Know-Batman80-5ca54cb83a27a6-53173051.png"
      />
      Batman
    </header>

    <TextInput onSend={t=> console.log(t)}/>

  </main>
}

function TextInput(props){
  var [text, setText] = useState('') 
  return <div className="text-input">
    <input className="text-field" value={text}
      placeholder ="write your message"
      onChange={e=> setText(e.target.value)}
    />
    <button className="button" onClick={()=> {
      
      props.onSend(text)
      setText('')
    }}>
      <img className="icon" src="https://cdn0.iconfinder.com/data/icons/superglyph-communication/30/message-sending-512.png" />
    </button>
  </div>
}

function PrintText(props){
  
}

export default App;
