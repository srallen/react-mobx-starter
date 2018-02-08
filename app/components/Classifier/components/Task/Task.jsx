import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Box, Heading, RadioButton, Button } from 'grommet';

@inject('annotationsStore')
@observer
export default class Task extends React.Component {
  constructor() {
    super();
    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    if (e.target.checked) {
      this.props.annotationsStore.onAnnotationChange(e.target.value);
    }
  }

  onSubmit(e) {
    e.preventDefault();

    console.log('called submit');
  }

  render() {
    const { question, answers, type } = this.props.task[0];

    // The view could be abstracted out into a functional component for the task type
    // A strategy could be written to pick the right component for task type using props.task.type
    return (
      <Box justify="center">
        <Heading level={3}>{question}</Heading>
        <form onSubmit={this.onSubmit}>
          <fieldset>
            {answers.map((answer, index) => {
              return (
                <RadioButton
                  key={answer.label}
                  id={answer.label}
                  value={answer.label}
                  label={answer.label}
                  name={type}
                  onChange={this.onChange}
                />
              )
            })}
          </fieldset>
          <hr />
          <Button primary={true} type="submit" label="Submit" />
        </form>
      </Box>
    );
  }
}

Task.propTypes = {
  annotationsStore: PropTypes.arrayOf(PropTypes.object),
  task: PropTypes.shape({
    answers: PropTypes.array,
    question: PropTypes.string,
    type: PropTypes.string
  })
};

Task.defaultProps = {
  annotationsStore: [],
  task: {
    answers: [],
    question: '',
    type: ''
  }
};
