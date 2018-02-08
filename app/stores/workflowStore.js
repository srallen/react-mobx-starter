import { observable, action, computed } from 'mobx';

const WORKFLOW_MOCK = {
  first_task: 'init',
  tasks: {
    init: [
      {
        type: 'single',
        question: 'Do you see an animal?',
        answers: [
          { label: 'Yes' },
          { label: 'No' }
        ]
      }
    ]
  }
};

export class WorkflowStore {
  @observable workflow = {};
  @observable currentTaskKey = '';

  @action setWorkflow(newWorkflow) {
    Promise.resolve(this.workflow = newWorkflow)
      .then(this.setCurrentTaskKey(newWorkflow.first_task));
  }

  @action setCurrentTaskKey(taskKey) {
    this.currentTaskKey = taskKey;
  }

  @computed get currentTask() {
    // Needs to be refactored to handle multi-task workflows
    return (this.workflow && this.workflow.tasks) ? this.workflow.tasks[this.currentTaskKey] : null;
  }

  fetchWorkflow() {
    // Mock an async request
    setTimeout(() => {
      return Promise.resolve(WORKFLOW_MOCK)
        .then((workflow) => {
          return this.setWorkflow(workflow);
        });
    }, 100);
  }
}

export default new WorkflowStore();
