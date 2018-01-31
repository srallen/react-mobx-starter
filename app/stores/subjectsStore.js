import { observable, action, computed } from 'mobx';

export const SUBJECTS_STATUS = {
  IDLE: 'idle',
  FETCHING: 'FETCHING',
  SUCCESS: 'SUCCESS',
  ERROR: 'error'
};

export class SubjectsStore {
  @observable status = SUBJECTS_STATUS.idle;
  @observable subjects = [];
  @observable currentSubject = {};

  @action fetchSubjects() {

  }
}

export default new SubjectsStore();
