import React from "react";
import { GoogleLogin } from "react-google-login";

const clientId =
  "605094676657-7iq4mvd9tebpt5p7sd1ftoom460m98qq.apps.googleusercontent.com";

function Login() {
  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! currentUser:", res.profileObj);
  };

  const onFailure = (res) => {
    console.log("[LOGIN FAILED] res:", res);
  };

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
