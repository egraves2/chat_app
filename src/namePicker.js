import React, {useState, useRef, useEffect} from 'react';
import {FiEdit, FiSave} from "react-icons/fi";
import './App.css';

function NamePicker(props) {
    const[editName, setEditName] = useState(false)
    const [name, setName] = useState('')
    const inputEl = useRef(null)

    function save(){
        // inputEl.current.focus()
            if(name && !editName) {
                props.onSave(name) 
                localStorage.setItem('name', name)
            }
            setEditName(!editName)
    }

    useEffect(()=>{
        const n = localStorage.getItem('name')
        if(n) {
            setName(n)
            save()
        }
    }, [])

        return <div className="edit-username" >
            {!editName && <input className="name-input"
            style={{display: editName ? 'none' : 'flex'}}
                onChange={e=>setName(e.target.value)}
                onKeyPress={e=> {
                    if(e.key==='Enter') props.onSave(name)
                }}
            />}
            {editName && <div>{name}</div>}

            <button className="name-button" onClick={save}>
                {editName ? <FiEdit /> : <FiSave/>}
            </button>
        </div>
    }

export default NamePicker;