import React from "react";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    case "LOGIN_FAILURE":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
} 

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, loginHosp, signOut };

// ###########################################################

function loginUser(dispatch, token) {
  if (!!token) {
    localStorage.setItem('token', token)
    localStorage.setItem('token_id', 1)
    dispatch({ type: 'LOGIN_SUCCESS' })
  } else {
    dispatch({ type: 'LOGIN_FAILURE' });
  }
}

function loginHosp(dispatch, token) {
  if (!!token) {
    localStorage.setItem('token', token)
    localStorage.setItem('token_id', 2)
    dispatch({ type: 'LOGIN_SUCCESS' })
  } else {
    dispatch({ type: 'LOGIN_FAILURE' });
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem('token');
  localStorage.removeItem('token_id');
  localStorage.removeItem('theme');
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/");
}
