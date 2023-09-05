import React, { useEffect, createContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// This is providing user context to the whole application.
//================================================================
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`users/${user.email}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data);
          setLoggedInUser(data.data);
        })
        .catch((error) => console.log("User context error:", error));
    }
  }, [isAuthenticated, user]);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};
