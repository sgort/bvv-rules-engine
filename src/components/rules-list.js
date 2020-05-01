import React from 'react';
import { Card } from 'semantic-ui-react';
import RulesCard from './rules-card';

export default function RulesList({ rules }) {
  const cards = () => {
    return rules.map(rule => {
      return <RulesCard key={rule._id} rule={rule} />
    });
  };

  return <Card.Group>{cards()}</Card.Group>
}