import React,{useState,useEffect} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

function Note(props) {
  const[isEditing,setIsEditing]=useState(false);
  const[titleEdited,setTitleEdited]=useState(props.title);
  const[contentEdited,setContentEdited]=useState(props.content);
  
  function deleteNote(){
    props.onClickDelete(props.id);
  }
  function startEdit(){
    setIsEditing(true);
  }
  function saveEdit(){
    props.onClickEdit(props.id,{title:titleEdited,content:contentEdited});
    setIsEditing(false);
  }
  function titleEditHandler(event){
    setTitleEdited(event.target.value);
    console.log(event.target.value);
  }
  function contentEditHandler(event){
    setContentEdited(event.target.value);
    console.log(event.target.value);
  }
  return (
    <div className="note">
      {isEditing?(<><textarea onChange={titleEditHandler} value={titleEdited}></textarea>
      <input type="text" onChange={contentEditHandler} value={contentEdited}></input>
      <button onClick={deleteNote} ><DeleteIcon/></button>
      <button onClick={saveEdit} > <DoneIcon/></button>
        </>)
      :(<><h1>{props.title}</h1>
       <p>{props.content}</p>
      <button onClick={deleteNote} ><DeleteIcon/></button>
      <button onClick={startEdit} ><EditIcon/></button>
        </>
)}
   
    
    </div>
  );
}

export default Note;
