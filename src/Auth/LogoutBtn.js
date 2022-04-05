import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';


const logoutBtnStyle = {
    backgroundColor: "#546e7a",
    margin: "1.6em 0 0 0.5em",
    padding: "0.5em 0",
    width: "13rem",
    border: "none",
    color: "white",
    borderRadius: "2em",
    display: "inline",
};

const LogoutBtn = () => {
  const { isAuthenticated, logout } = useAuth0();
  
  if ( isAuthenticated ) {
    return (
    <button
      style={logoutBtnStyle}
      onClick={() => logout( {
        returnTo: window.location.origin,
      } )}
    >
      Log Out
    </button>
    );
  }  
};


export default LogoutBtn;