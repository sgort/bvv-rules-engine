import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import RulesForm from '../components/rules-form';
import { flashErrorMessage } from '../components/flash-message';
import { RulesContext } from '../context/rules-context';

export default function RulesFormPage({ match }) {
    const [state, dispatch] = useContext(RulesContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { _id } = match.params; // Grab URL _id
        if (_id) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:9000/rulesengine/${_id}`);
                    dispatch({
                        type: 'FETCH_RULESMAP',
                        payload: response.data.data[0],
                    });
                    setLoading(false);
                } catch (error) {
                    flashErrorMessage(dispatch, error);
                }
            };
            fetchData();
        } else {
            setLoading(false);
        }
    }, [match.params, dispatch]);

    if (loading) {
        return <p>Please wait...</p>;
    }

    return (
        <div>
            <RulesForm rulesmap={state.rulesmap} />
        </div>
    );
}
