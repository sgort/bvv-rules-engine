import React from 'react';
import { Card } from 'semantic-ui-react';
import RulesCard from './rules-card';

export default function RulesList({ rules }) {
  const cards = () => {
    return rules.map(rulesmap => {
      return <RulesCard key={rulesmap._id} rulesmap={rulesmap} />
    });
  };

  return <Card.Group>{cards()}</Card.Group>
}