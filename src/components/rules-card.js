import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { RulesContext } from '../context/rules-context';
import { flashErrorMessage } from './flash-message';

const { useContext } = React;

export default function RulesCard({ rulesmap }) {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(RulesContext);

  const deleteRules = async id => {
    try {
      const response = await axios.delete(`http://localhost:9000/rulesengine/${id}`);
      dispatch({
        type: 'DELETE_RULESMAP',
        payload: response.data,
      });
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };


  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Icon name="address card outline" /> {rulesmap.reference} - {rulesmap.issuer}
        </Card.Header>
        <Card.Description>
          <p>
            <Icon name="clock outline" /> {rulesmap.date_start}
          </p>
          <p>
            <Icon name="stop circle outline" /> {rulesmap.date_end}
          </p>
          <p>
            <Icon name="code" /> {rulesmap.rules}
          </p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button
            basic
            color="green"
            as={Link}
            to={`/rules/edit/${rulesmap._id}`}
          >
            Edit
          </Button>
          <Button basic color="red" onClick={() => deleteRules(rulesmap._id)}>
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}