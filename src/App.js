import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import "./App.css";
import logo from "./logo.png";
import GoogleLogin from "react-google-login";

//react form
import List from "./components/List";

function App() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

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

  //handling login failure
  const handleFailure = (result) => {
    alert(result);
  };

  //handling login
  const handleLogin = async (googleData) => {
    //sending AJAX request
    const res = await fetch("/api/google-login", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    //setting login data state
    setLoginData(data);
    //set local storage based on the data from the backend
    localStorage.setItem("loginData", JSON.stringify(data));
  };

  //handling logout
  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  return (
    //drag and drop
    <div className="App">
      <header className="App-header">
        <div>
          <img src={logo} className="App-logo" alt="logo" />
          <div id="signIn">
            {loginData ? (
              <div>
                <h3> You logged in as {loginData.email}</h3>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} //client ID is in the .env file. each ID is linked to a developer account and the same dev account must be used for testing
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onFailure={handleFailure}
                cookiePolicy={"single_host_origin"}
              ></GoogleLogin>
            )}
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

///event listener for ctrl+v
document.body.addEventListener("keyup", (e) => {
  if (e.ctrlKey && e.key === "v") {
    console.log("ctrl+v is clicked");
  }
});

export default App;
