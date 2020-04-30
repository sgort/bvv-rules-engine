import React, { Component } from "react";
import { Engine } from 'json-rules-engine';

/**
 * Setup a new engine
 */
let engine = new Engine()

// define a rule for detecting the player has exceeded foul limits.  Foul out any player who:
// (has committed 5 fouls AND game is 40 minutes) OR (has committed 6 fouls AND game is 48 minutes)
let rulesengine = {
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
}
engine.addRule(rulesengine);

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

function CreateRulesEngine() {
    // POST the Rules set in the collection
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "domain": "BVV",
        "reference": "BVV_v3",
        "issuer": "SZW",
        "rules": "MAX (82% income OR € 865)"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:9000/rulesengine/insert", requestOptions)
        .then(response => response.text())
        .then(result => alert(result))
        .catch(error => alert('error', error));
}

class CheckRules extends Component {
    render() {
        return (
            <div>
                <p></p>
                <p>Reference | Issuer | Date Start | Date End</p>
                <p>BVV_v3 | SZW | {new Date(Date.now()).toLocaleString()} | ...</p>
                <p>Rules:</p>
                <p>MAX (82% income OR € 865)</p>
                <p className="Check Rules"><button onClick={doEngineSession}>Check rules!</button></p>
                <p className="Save Rules"><button onClick={CreateRulesEngine}>Save rules!</button></p>
            </div>
        )
    }
}

export default CheckRules;
