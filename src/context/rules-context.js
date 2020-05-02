import React, { useReducer, createContext } from 'react';

export const RulesContext = createContext();

const initialState = {
  rules: [],
  rulesmap: {}, // selected or new
  message: {}, // { type: 'success|fail', title:'Info|Error' content:'lorem ipsum'}
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_RULES': {
      return {
        ...state,
        rules: action.payload,
        rulesmap: {},
      };
    }
    case 'CREATE_RULESMAP': {
      return {
        ...state,
        rules: [...state.rules, action.payload],
        message: {
          type: 'success',
          title: 'Create Successful',
          //content: action.payload.message, // Message is defined in the API controller
          content: 'New Rules created!', // Message definition in API controller not in (filtered) payload
        },
      };
    }
    case 'FETCH_RULESMAP': {
      return {
        ...state,
        rulesmap: action.payload,
        message: {},
      };
    }
    case 'UPDATE_RULESMAP': {
      const rulesmap = action.payload;
      return {
        ...state,
        rules: state.rules.map(item =>
          item._id === rulesmap._id ? rulesmap : item,
        ),
        message: {
          type: 'success',
          title: 'Update Successful',
          content: rulesmap.message, // Message is defined in the API controller
        },
      };
    }
    case 'DELETE_RULESMAP': {
      const _id = action.payload;
      return {
        ...state,
        rules: state.rules.filter(item => item._id !== _id),
        message: {
          type: 'success',
          title: 'Delete Successful',
          content: action.payload.message, // Message is defined in the API controller
        },
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