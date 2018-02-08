import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Task from '../Task';

@inject('workflowStore')
@observer
export default class Workflow extends React.Component {
  componentDidMount() {
    this.props.workflowStore.fetchWorkflow();
  }

  render() {
    const { currentTask } = this.props.workflowStore;
    if (currentTask) {
      return (
        <Task task={currentTask} />
      );
    }

    return <span>Loading...</span>;
  }
}