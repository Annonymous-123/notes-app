import React,{useEffect,useState} from "react";
import NoteAltIcon from '@mui/icons-material/NoteAlt';

function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);
  return (
    <header className="header">
      <h1><NoteAltIcon/> Keeper</h1>
    
      <div className="theme-toggle">
      <span>{darkMode ? '☀️ Light Mode ' : '🌙 Dark Mode '}</span>
      <label className="switch">
     <input  type="checkbox" onClick={() => setDarkMode(!darkMode)}/>
        
  <span className="slider round"></span>
</label>
        </div>
    </header>
  );
}

export default Header;
