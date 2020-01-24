import {useState, useEffect} from 'react'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

let store
const coll = 'messages'

function useDB(room) {
    const [messages, setMessages] = useState([])
    function add(m) {
        setMessages(current => {
            const msgs = [m, ...current]
            msgs.sort((a,b)=> b.ts.seconds - a.ts.seconds)
            return msgs
        })
    }
    function remove(id) {
        setMessages(current=> current.filter(m=> m.id!==id))
    }
    useEffect(() => {
        store.collection(coll)
         .where('room','==',room)
        .onSnapshot(snap=> snap.docChanges().forEach(c=> {
            const {doc, type} = c
            if (type==='added') add({...doc.data(),id:doc.id})
            if (type==='removed') remove(doc.id)
        }))
    }, [])
    return messages
}

const db = {}
db.send = function(msg) {
    return store.collection(coll).add(msg)
}
db.delete = function(id) {
    return store.collection(coll).doc(id).delete()
}

export { db, useDB }

const firebaseConfig = {
    apiKey: "AIzaSyA1b-9UXjnmFgoWJ3qXSHeQoR1gCtk2pUY",
  authDomain: "chatappproject2020.firebaseapp.com",
  databaseURL: "https://chatappproject2020.firebaseio.com",
  projectId: "chatappproject2020",
  storageBucket: "chatappproject2020.appspot.com",
  messagingSenderId: "155423227574",
  appId: "1:155423227574:web:00622e482217c7f900b017",
  measurementId: "G-YC0SX0E86M"
}

firebase.initializeApp(firebaseConfig)
store = firebase.firestore()