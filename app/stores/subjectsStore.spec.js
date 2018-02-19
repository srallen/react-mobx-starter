/* eslint prefer-arrow-callback: 0, func-names: 0, 'import/prefer-default-export': 0 */

import sinon from 'sinon';
import { SubjectsStore, SUBJECTS_STATUS } from './subjectsStore';
import requests from '../lib/apiClient';

const fetchSubjectsResponseMock = {
  subjects: [{ locations: [{ 'image/png': 'https://mock-image-source.com/image.png' }] }],
  meta: { pages: 2 }
};

describe('subjectsStore', function() {
  it('instantiates with default observable stores', function() {
    const subjectsStore = new SubjectsStore();
    expect(subjectsStore.subjects).to.instanceof(Object);
    expect(subjectsStore.status).to.equal(SUBJECTS_STATUS.IDLE);
    expect(subjectsStore.metadata).to.instanceof(Object);
  });

  describe('#setSubjects action', function() {
    let subjectsStore;
    let setSubjectsSpy;
    before(function() {
      subjectsStore = new SubjectsStore();
      setSubjectsSpy = sinon.spy(SubjectsStore.prototype, 'setSubjects');
    });

    it('should set this.subjects and this.metadata stores', function() {
      subjectsStore.setSubjects(fetchSubjectsResponseMock);
      expect(setSubjectsSpy.calledOnce).to.be.true();
      expect(setSubjectsSpy.calledWith(fetchSubjectsResponseMock)).to.be.true();
      expect(subjectsStore.subjects).to.have.lengthOf(1);
      expect(Object.keys(subjectsStore.metadata)).to.have.lengthOf(1);
    });

    after(function() {
      setSubjectsSpy.resetHistory();
    });
  });

  describe('#setStatus action', function() {
    let subjectsStore;
    let setStatusSpy;
    before(function() {
      subjectsStore = new SubjectsStore();
      setStatusSpy = sinon.spy(SubjectsStore.prototype, 'setStatus');
    });

    after(function() {
      setStatusSpy.restore();
    });

    it('should set this.status store', function() {
      subjectsStore.setStatus(SUBJECTS_STATUS.SUCCESS);
      expect(setStatusSpy.calledOnce).to.be.true();
      expect(setStatusSpy.calledWith(SUBJECTS_STATUS.SUCCESS)).to.be.true();
      expect(subjectsStore.status).to.equal(SUBJECTS_STATUS.SUCCESS);
    });

    after(function() {
      setStatusSpy.resetHistory();
    });
  });

  describe('#getNextSubject action', function() {
    let subjectsStore;
    let getNextSubjectSpy;
    let fetchSubjectsSpy;
    before(function() {
      sinon.stub(requests, 'get').callsFake(() => { return Promise.resolve([]); });
      fetchSubjectsSpy = sinon.spy(SubjectsStore.prototype, 'fetchSubjects');
      getNextSubjectSpy = sinon.spy(SubjectsStore.prototype, 'getNextSubject');
      subjectsStore = new SubjectsStore();
    });

    after(function() {
      fetchSubjectsSpy.restore();
      getNextSubjectSpy.restore();
    });

    afterEach(function() {
      fetchSubjectsSpy.resetHistory();
      getNextSubjectSpy.resetHistory();
    });

    it('should call #fetchSubjects if this.subjects is an empty array', function() {
      subjectsStore.getNextSubject();
      expect(fetchSubjectsSpy.calledOnce).to.be.true();
    });

    it('should remove the current subject if this.subjects has a length', function() {
      const multipleSubjectsMock = {
        subjects: [
          { locations: [{ 'image/png': 'https://mock-image-source.com/image.png' }] },
          { locations: [{ 'image/png': 'https://mock-image-source.com/another.png' }] }
        ],
        meta: {}
      };

      subjectsStore.setSubjects(multipleSubjectsMock);
      expect(subjectsStore.subjects).to.have.lengthOf(2);
      subjectsStore.getNextSubject();
      expect(subjectsStore.subjects).to.have.lengthOf(1);
    });

    it('should call #fetchSubjects if the subjects queue becomes empty', function() {
      subjectsStore.setSubjects(fetchSubjectsResponseMock);
      subjectsStore.getNextSubject();
      expect(subjectsStore.subjects).to.have.lengthOf(0);
      expect(fetchSubjectsSpy.calledOnce).to.be.true();
    });
  });
});
