import React,{useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
const[clicked,setClicked]=useState(false);
const[note,setNote]=useState({title:"",content:""});
function ChangeHandler(event){
  const{name,value}=event.target;
  setNote((prevValue)=>{
    return{
    ...prevValue,[name]:value}
  }) 
 };
  function onClickAdd(){
    props.addNote(note);
    setNote({title:"",content:""});
      event.preventDefault();
  
  };
  function InputClickHandler(){
   setClicked(true);
    console.log(clicked);
  }
  return (
    <div>
      <form className="create-note">
         
  {clicked?  <input  onChange={ChangeHandler} name="title" placeholder="Title" value={note.title} />:null}
        
   <textarea onClick={InputClickHandler} onChange={ChangeHandler} name="content" placeholder="Take a note..." rows={clicked?"3":"1"} value={note.content}/>
          
        
        <Zoom in={clicked}>
        <Fab onClick={onClickAdd}><AddIcon/></Fab>
          </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
