import React, { Component } from "react";
import TextFileReader from './components/text-file-reader';
import { Engine } from 'json-rules-engine';
const BvvRules = require('./bvv-rules.txt');

/**
 * Setup a new engine
 */
let engine = new Engine()

// define a rule for detecting the player has exceeded foul limits.  Foul out any player who:
// (has committed 5 fouls AND game is 40 minutes) OR (has committed 6 fouls AND game is 48 minutes)
engine.addRule({
    conditions: {
        any: [{
            all: [{
                fact: 'gameDuration',
                operator: 'equal',
                value: 40
            }, {
                fact: 'personalFoulCount',
                operator: 'greaterThanInclusive',
                value: 5
            }]
        }, {
            all: [{
                fact: 'gameDuration',
                operator: 'equal',
                value: 48
            }, {
                fact: 'personalFoulCount',
                operator: 'greaterThanInclusive',
                value: 6
            }]
        }]
    },
    event: {  // define the event to fire when the conditions evaluate truthy
        type: 'fouledOut',
        params: {
            message: 'Player has fouled out!'
        }
    }
})

/**
 * Define facts the engine will use to evaluate the conditions above.
 * Facts may also be loaded asynchronously at runtime; see the advanced example below
 */
let facts = {
    personalFoulCount: 6,
    gameDuration: 40
}

function doEngineSession() {
    // Run the engine to evaluate
    engine
        .run(facts)
        .then(results => {
            // 'results' is an object containing successful events, and an Almanac instance containing facts
            results.events.map(event => alert(event.params.message))
        })
}

class Rules extends Component {
    render() {
        return (
            <div>
                <h1>Rules Engine config</h1>
                <TextFileReader
                    txt={BvvRules}
                />
                <p></p>
                <p className="Check Rules"><button onClick={doEngineSession}>Check rules!</button></p>
            </div>
        )
    }
}

export default Rules;
