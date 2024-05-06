import React, { useState, createContext, useContext } from "react";

export const StateContext = createContext(null);

export const StateProvider = (props) => {

  const [state, setState] = useState({});
  const updateState = (key, value) => {
    setState(prevState => ({ ...prevState, [key]: value }));
  };

  return (
    <StateContext.Provider value={{state, updateState}}>
      {props.children}
    </StateContext.Provider>
  );
};

export const useSharedState = () => useContext(StateContext);

export const withSharedState = Component => {
  return props => {
    const sharedState = useSharedState();
    return <Component {...props} sharedState={sharedState} />;
  };
};