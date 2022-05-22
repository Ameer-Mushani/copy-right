import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
//import Login from "./components/Login";
//import Logout from "./components/Logout";
import logo from "./logo.png";
import List from "./components/List";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import "./App.css";
import { signInWithGoogle } from "./Firebase";

const clientId =
  "605094676657-7iq4mvd9tebpt5p7sd1ftoom460m98qq.apps.googleusercontent.com";

//react form

function App() {
  //update scope with API
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });

  //if you are attempting to use APIs and they are looking for an access token, this is how you get an API access token of the user signed in
  //var accessToken = gapi.auth.getToken().access_token;

  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: "200px" }} alt="preview" />
      </div>
    </div>
  ));

  return (
    //drag and drop
    <div className="App">
      <header className="App-header">
        <div>
          <img src={logo} className="App-logo" alt="logo" />
          <div id="signIn">
            <button onClick={signInWithGoogle}> Sign in With Google </button>
          </div>
        </div>
      </header>

      <body>
        <table>
          <tr>
            <td class="inputSide">
              <motion.div
                class="dropArea"
                {...getRootProps()}
                whileHover={{ backgroundColor: "#808080" }}
              >
                <input {...getInputProps()} />
                Drop files here
              </motion.div>
            </td>
            <td class="inputSide">
              <List />
            </td>
          </tr>
          <tr>
            <td>
              <div id="fileList">{images}</div>
            </td>
            <td></td>
          </tr>
        </table>
      </body>

      <footer>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="Tile"
        >
          Clear All
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="Tile"
        >
          History
        </motion.button>
      </footer>
    </div>
  );
}

//function that takes data from the clipboard and returns the text
/*
async function paste() {
  const text = await navigator.clipboard.readText();
  return text;
}
*/

// function CreateTile(props) {
//   return (
//     <motion.div hover whileHover={{ scale: 1.2 }} className="Tile">
//       {props.data}
//     </motion.div>
//   );
// return <input  className = "Tile" value = {props.data} onClick={() => {navigator.clipboard.writeText(this.innerHTML)}}></input>
//}
/*
function CreateFileTile(props){
  return <motion.div drag dragConstraints={{top: -50,left: -50,right: 600,bottom: 300,}} className = "FileTile" >{props.data}</motion.div>
  }
  */

//event listener for ctrl+v
document.body.addEventListener("keyup", (e) => {
  if (e.ctrlKey && e.key === "v") {
    console.log("ctrl+v is clicked");
  }
});

export default App;
