import React, { useContext, useState } from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import classnames from 'classnames';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { RulesContext } from '../context/rules-context';
import { flashErrorMessage } from './flash-message';


export default function RulesForm({ rulesmap }) {
  const [state, dispatch] = useContext(RulesContext);
  const { register, errors, handleSubmit } = useForm({
    defaultValues: rulesmap,
  });
  const [redirect, setRedirect] = useState(false);

  const createRules = async data => {
    try {
      const response = await axios.post('http://localhost:9000/rulesengine/insert', data);
      dispatch({
        type: 'CREATE_RULESMAP',
        payload: response.data.rules[0], // controller returns rules[] array via RulesEngin.insertMany(req.body) call
      });
      setRedirect(true);
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };

  const updateRules = async data => {
    try {
      const response = await axios.patch(`http://localhost:9000/rulesengine/${rulesmap._id}`, data,
      );
      dispatch({
        type: 'UPDATE_RULESMAP',
        payload: response.data,
      });
      setRedirect(true);
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };

  const onSubmit = async data => {
    if (rulesmap._id) {
      await updateRules(data);
    } else {
      await createRules(data);
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <Grid centered columns={1}>
      <Grid.Column width={8}>
      <h1 style={{ marginTop: "1em" }}>
                    {rulesmap._id ? "Edit Rules" : "Add New Rules"}
                </h1>
        <Form onSubmit={handleSubmit(onSubmit)} loading={state.loading}>
          <Form.Group>
            <Form.Field className={classnames({ error: errors.reference })} width={4}>
              <label htmlFor="reference">
                Reference
                <input
                  id="reference"
                  name="reference"
                  type="text"
                  placeholder="Reference"
                  ref={register({ required: true, minLength: 2 })}
                />
              </label>
              <span className="error">
                {errors.reference &&
                  errors.reference.type === 'required' &&
                  'You need to provide a Reference'}
              </span>
              <span className="error">
                {errors.name &&
                  errors.name.type === 'minLength' &&
                  'Must be 2 or more characters'}
              </span>
            </Form.Field>
            <Form.Field className={classnames({ error: errors.issuer })} width={12}>
              <label htmlFor="issuer">
                Issuer
                <input
                  id="issuer"
                  name="issuer"
                  type="text"
                  placeholder="Issuer"
                  ref={register({
                    required: true,
                  })}
                />
              </label>
              <span className="error">
                {errors.issuer &&
                  errors.issuer.type === 'required' &&
                  'You need to provide an Issuer'}
              </span>
            </Form.Field>
          </Form.Group>
          <Form.Field className={classnames({ error: errors.rules })} width={16}>
            <label htmlFor="rules">
              Rules
              <input
                id="rules"
                name="rules"
                type="text"
                placeholder="Rules"
                ref={register({ required: false })}
              />
            </label>
          </Form.Field>
          <Form.Group>
            <Form.Field className={classnames({ error: errors.date_start })} width={8}>
              <label htmlFor="date_start">
                Date Start
                <input
                  id="date_start"
                  name="date_start"
                  type="text"
                  placeholder="Date Start"
                  width={2}
                  ref={register({
                    required: true,
                  })}
                />
              </label>
              <span className="error">
                {errors.date_start &&
                  errors.date_start.type === 'required' &&
                  'You need to provide a start date'}
              </span>
            </Form.Field>
            <Form.Field className={classnames({ error: errors.date_end })} width={8}>
              <label htmlFor="date_end">
                Date End
                <input
                  id="date_end"
                  name="date_end"
                  type="text"
                  placeholder="Date End"
                  ref={register({ required: false, minLength: 2 })}
                />
              </label>
              <span className="error">
                {errors.date_end &&
                  errors.date_end.type === 'minLength' &&
                  'Must be 4 or more characters'}
              </span>
            </Form.Field>
          </Form.Group>
          <Button primary type="submit">
            Save
      </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
}
