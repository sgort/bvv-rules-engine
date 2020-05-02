import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import RulesList from '../components/rules-list';
import { RulesContext } from '../context/rules-context';
import FlashMessage, { flashErrorMessage } from '../components/flash-message';


export default function RulesListPage() {
  const [state, dispatch] = useContext(RulesContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/rulesengine/');
        dispatch({
          type: 'FETCH_RULES',
          payload: response.data.data || response.data, // in case pagination is disabled
        });
      } catch (error) {
        flashErrorMessage(dispatch, error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <h1>List of Rules</h1>
      {state.message.content && <FlashMessage message={state.message} />}
      <RulesList rules={state.rules} />
    </div>
  );
};
