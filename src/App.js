import React, { useState } from "react"
import { useDropzone } from "react-dropzone"
import { motion} from "framer-motion"
import "./App.css"

function App() {
  const [files, setFiles] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })

  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: "200px" }} alt="preview" />
      </div>
    </div>
  ))

  return (
    <motion.div className="App" whileHover={{ backgroundColor: "#808080"}}>
      <div class = "dropArea" {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drop files here</p>
      </div>
      <div>{images}</div>
    </motion.div>
  )
}

export default App

/*





import logo from './logo.png';
import { motion} from "framer-motion"
import './App.css';
import{useDropzone} from 'react-dropzone'


//react 
import React, {useState} from 'react';
import * as ReactDOM from 'react-dom';

//function that takes data from the clipboard and returns the text

async function paste() {
  const text = await navigator.clipboard.readText();
  return text;
}


function CreateTile(props){
  return <motion.div drag dragConstraints={{top: -50,left: -50,right: 600,bottom: 300,}} className = "Tile" >{props.data}</motion.div>
  
 // return <input  className = "Tile" value = {props.data} onClick={() => {navigator.clipboard.writeText(this.innerHTML)}}></input>
}
function CreateFileTile(props){
  return <motion.div drag dragConstraints={{top: -50,left: -50,right: 600,bottom: 300,}} className = "FileTile" >{props.data}</motion.div>
  }


function App() {

  const [files, setFiles] = useState([])

  const {getRoot, getInputProps} = useDropzone({
    accept: "images/*",
    onDrop: (acceptedFiles) ={
      setFiles(
        acceptedFiles.map(file) => Object.assign((file), {
          preview: URL.createObjectURL(file)
        })
      )
    }

  });

  const images = files.map((file) => (
    <div key = {file.name}>
      <div>
        <img src = {file.preview} style = {{width: "200px"} } alt = ""/>
      </div>

    </div>
  ))
    return (
      <div className='App'>
        <div {...getRoot()}/>
        <input {...getInputProps()}/>
        <p>Drop Files Here</p>
        
      <div>{images}</div>
      </div>

    )
/*
  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      </header>
      <body>
      <div id = "textDiv">
            <CreateTile data = "text item 1"/>
            <CreateTile data = "text item 2"/>
            <CreateTile data = "text item 3"/>
            </div>
            <div id = "fileDiv">

            </div>
      </body>

      <footer>
      <motion.button onClick = {clearSpace} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}className = "Tile">Clear All</motion.button>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className = "Tile">History</motion.button>
      </footer>
    </div>
  );
  
}

function clearSpace(){
  let parent =  document.getElementById("parentDiv")
  parent.innerHTML = "";

}


///event listener for ctrl+v
document.body.addEventListener('keyup', (e) =>{
  if(e.ctrlKey && e.key ==='v'){
    console.log("ctrl+v is clicked");


  }
})


export default App;*/
