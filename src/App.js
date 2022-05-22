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

  var signedIn = false;
  //watch for user login/logout and update user id accordingly
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      userId = user.uid;
      signedIn = true;
    } else {
      //user is signed out
      userId = "0";
      signedIn = false;
    }
  });

  return (
    //drag and drop
    <div className="App">
      <header className="App-header">
        <div>
          <img src={logo} className="App-logo" alt="logo" />
          <div id="signIn">
            <button className="googleSignIn" onClick={signInWithGoogle}>
              {" "}
              Sign in With Google{" "}
            </button>
          </div>
        </div>
      </header>

      <div id="bodyContainer">
        <table className="textTable">
          <tbody>
            <tr>
              <td id="dropSide">
                <table id="dropTable">
                  <tbody>
                    <tr>
                      <td>
                        <motion.div
                          className="dropArea"
                          {...getRootProps()}
                          whileHover={{ backgroundColor: "#808080" }}
                        >
                          <input {...getInputProps()} />
                          Drop files here
                        </motion.div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {" "}
                        <div id="fileList">{images}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="inputSide">
                <div className="outer">
                  <List />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

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

export default App;
