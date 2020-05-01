import React, { useReducer, createContext } from 'react';

export const RulesContext = createContext();

const initialState = {
  rules: [],
  rule: {}, // selected or new
  message: {}, // { type: 'success|fail', title:'Info|Error' content:'lorem ipsum'}
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_RULES': {
      return {
        ...state,
        rules: action.payload,
        rule: {},
      };
    }
    case 'FLASH_MESSAGE': {
      return {
        ...state,
        message: action.payload,
      };
    }
    default:
      throw new Error();
  }
}

export const RulesContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return (
    <RulesContext.Provider value={[state, dispatch]}>
      {children}
    </RulesContext.Provider>
  );
};