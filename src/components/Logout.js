import React from "react";
import { GoogleLogout } from "react-google-login";

const clientId =
  "605094676657-7iq4mvd9tebpt5p7sd1ftoom460m98qq.apps.googleusercontent.com";

function Logout() {
  const onSuccess = () => {
    console.log("Log out successful");
  };

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
