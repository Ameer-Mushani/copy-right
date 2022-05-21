import React, { useState } from "react"
import { useDropzone } from "react-dropzone"
import { motion} from "framer-motion"
import "./App.css"
import logo from './logo.png';

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
    //drag and drop
    <div className="App" >
      <header className="App-header">
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <div id = "signIn">Sign In:
        <motion.button  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}className = "googleSignIn"></motion.button>

        </div>
      </div>
      </header>

            <body>


              <table>
              <tr>
                <td class = "inputSide">        
                <motion.div class = "dropArea" {...getRootProps()} whileHover={{ backgroundColor: "#808080"}}>
        <input {...getInputProps()} />
        Drop files here
      </motion.div>
          </td>
          <td><div id = "fileList">{images}</div></td>
        </tr>
            <tr>
              <td class = "inputSide"><input id = "inputField" placeHolder = "Enter Text" value = ""></input>      <motion.button  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}className = "Tile">Save</motion.button>
</td>
                <td>
                <div id = "textDiv">
            <CreateTile data = "text item 1"/>
            <CreateTile data = "text item 2"/>
            <CreateTile data = "text item 3"/>
            </div>
                </td>
              </tr>
              </table>

      </body>

      

      <footer>
      <motion.button  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}className = "Tile">Clear All</motion.button>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className = "Tile">History</motion.button>
      </footer>

    </div>

    
  )
}

//function that takes data from the clipboard and returns the text
/*
async function paste() {
  const text = await navigator.clipboard.readText();
  return text;
}
*/

function CreateTile(props){
  return <motion.div hover whileHover={{scale:1.2}} className = "Tile" >{props.data}</motion.div>
  
 // return <input  className = "Tile" value = {props.data} onClick={() => {navigator.clipboard.writeText(this.innerHTML)}}></input>
}
/*
function CreateFileTile(props){
  return <motion.div drag dragConstraints={{top: -50,left: -50,right: 600,bottom: 300,}} className = "FileTile" >{props.data}</motion.div>
  }
  */

///event listener for ctrl+v
document.body.addEventListener('keyup', (e) =>{
  if(e.ctrlKey && e.key ==='v'){
    console.log("ctrl+v is clicked");


  }
})


export default App;
