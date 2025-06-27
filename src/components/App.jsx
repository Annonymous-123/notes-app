import React,{useState,useEffect} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

const BACKEND_URL="https://notes-app-backend-tztu.onrender.com";
     

function App() {
    //For fetching the notes from database
  
const[notes,setNotes]=useState([]);
  useEffect(()=>{
    fetch(`${BACKEND_URL}/`)
    .then(res=>res.json())
    .then(data=>setNotes(data))
    .catch(err=>console.error("Failed to fetch notes",err));
  },[]);
  //For adding the new note to database
function onClickAdd(note){
  fetch(`${BACKEND_URL}/`,
       {
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({title:note.title,content:note.content})
  })
    .then(res=>res.json())
    .then(addedNote=>{
      setNotes((prevValue)=>{
      return[...prevValue,addedNote]
    });
    });
  toast("Note Added");
  }
  //For deleting the deleted note from database
  function onClickDelete(id){
    fetch(`${BACKEND_URL}/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
         return response.json(); 
      } else {
        console.error("Failed to delete note");
      }
    })
    .then(result => console.log('Deleted:', result));
    toast.success("Note Deleted");
  }
  function onClickEdit(id,editedNote){
    fetch(`${BACKEND_URL}/${id}`,{
      method:'PATCH',
      headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(editedNote)

    })
   
   .then(response => {
      if (!response.ok) {
        throw new Error("Failed to edit note");
      }
      return response.json();
    })
    .then(updatedNote => {
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note.id === id ? updatedNote : note
        )
      );
      console.log('Edited:', updatedNote);
    })
    .catch(error => {
      console.error(error.message);
    });
}

  return (
    <div>
      <Header />


      <CreateArea addNote={onClickAdd}/>
       {notes.map((note)=>{
        return <Note
                 onClickDelete={onClickDelete}
                 onClickEdit={onClickEdit}
                 key={note.id} 
                 id={note.id} 
                 title={note.title} 
                 content={note.content}/>;
                  })}
         <ToastContainer position ="top-right" autoClose={3000} hideProgressBar={true}/>
      <Footer />
    </div>
  );
}

export default App;
