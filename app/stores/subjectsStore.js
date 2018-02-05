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
  @observable currentSubject = {};

  @action setSubjects(newSubjects) {
    this.subjects = newSubjects;
  }

  @action setStatus(newStatus) {
    this.status = newStatus;
  }

  clear() {
    this.subjects.clear();
    this.currentSubject = {};
  }

  @action fetchSubjects() {
    this.setStatus(SUBJECTS_STATUS.FETCHING);
    const query = [{
      workflow_id: '2333',
      subject_set_id: '4240'
    }];
    return get('/subjects/queued', query)
      .then((subjects) => {
        this.setSubjects(subjects);
      })
      .then(this.setStatus(SUBJECTS_STATUS.SUCCESS))
      .catch(action((error) => {
        this.setStatus(SUBJECTS_STATUS.ERROR);
        if (error.status !== 404) console.error(error);
      }));
  }
}

export default new SubjectsStore();
