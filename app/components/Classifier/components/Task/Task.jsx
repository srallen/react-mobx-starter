import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Box, Heading, RadioButton, Button } from 'grommet';

@observer
export default class Task extends React.Component {
  onChange(e) {
    console.log(e.target.checked)
  }

  onSubmit(e) {
    e.preventDefault();

    console.log('called submit');
  }

  render() {
    return (
      <Box justify="center">
        <Heading level={3}>Do you see an animal?</Heading>
        <form onSubmit={this.onSubmit}>
          <fieldset>
            <RadioButton id="yes" value="yes" label="Yes" name="animal" onChange={this.onChange} />
            <RadioButton id="no" value="no" label="No" name="animal" onChange={this.onChange} />
          </fieldset>
          <hr />
          <Button primary={true} type="submit" label="Submit" />
        </form>
      </Box>
    );
  }
}