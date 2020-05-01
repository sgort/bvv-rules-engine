import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';

export default function RulesCard({ rule }) {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Icon name="address card outline" /> {rule.reference} - {rule.issuer}
        </Card.Header>
        <Card.Description>
          <p>
            <Icon name="clock outline" /> {rule.date_start}
          </p>
          <p>
            <Icon name="stop circle outline" /> {rule.date_end}
          </p>
          <p>
            <Icon name="code" /> {rule.rules}
          </p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green">
            Edit
          </Button>
          <Button basic color="red">
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}