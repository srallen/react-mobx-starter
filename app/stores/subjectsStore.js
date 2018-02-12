import { observable, action, computed } from 'mobx';
import { get } from '../lib/apiClient';

export const SUBJECTS_STATUS = {
  IDLE: 'idle',
  FETCHING: 'FETCHING',
  SUCCESS: 'SUCCESS',
  ERROR: 'error'
};

export class SubjectsStore {
  @observable status = SUBJECTS_STATUS.IDLE;
  @observable subjects = [];
  @observable metadata = {};

  @action setSubjects(response) {
    this.subjects = response.subjects;
    this.metadata = response.meta;
  }

  @action setStatus(newStatus) {
    this.status = newStatus;
  }

  @action getNextSubject() {
    if (this.subjects.length > 0) {
      Promise.resolve(this.subjects.remove(this.current))
        .then(() => {
          if (this.subjects.length === 0) {
            this.fetchSubjects();
          }
        });
    }

    return null;
  }

  @computed get current() {
    return this.subjects.find((subject, index) => { return (index === 0); }) || null;
  }

  fetchSubjects() {
    this.setStatus(SUBJECTS_STATUS.FETCHING);
    const query = [{
      workflow_id: '2333',
      subject_set_id: '4240'
    }];
    return get('/subjects/queued', query)
      .then((response) => {
        this.setSubjects(response);
      })
      .then(this.setStatus(SUBJECTS_STATUS.SUCCESS))
      .catch(action((error) => {
        this.setStatus(SUBJECTS_STATUS.ERROR);
        if (error.status !== 404) console.error(error);
      }));
  }
}

export default new SubjectsStore();
