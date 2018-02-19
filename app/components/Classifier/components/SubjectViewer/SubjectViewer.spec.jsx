/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/react-in-jsx-scope': 0 */

import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { Paragraph, Image } from 'grommet';
import SubjectViewer from './SubjectViewer';
import { SubjectsStore } from '../../../../stores/subjectsStore';

describe('SubjectViewer', function() {
  let fetchSubjectsStub;
  const subjectsStore = new SubjectsStore();
  before(function () {
    fetchSubjectsStub = sinon.stub(subjectsStore, 'fetchSubjects').callsFake(() => { });
  });

  after(function () {
    subjectsStore.fetchSubjects.restore();
  });

  it('should render without crashing', function() {
    shallow(<SubjectViewer subjectsStore={subjectsStore} />);
  });

  describe('componentDidMount', function() {
    it('should call props.subjectsStore.fetchSubjects', function() {
      mount(<SubjectViewer subjectsStore={subjectsStore} />);
      expect(fetchSubjectsStub.calledOnce).to.be.true();
    });
  });

  describe('when there is not a current subject', function() {
    before(function () {
      fetchSubjectsStub.resetHistory();
    });

    it('should render a Paragraph component', function() {
      const wrapper = mount(<SubjectViewer subjectsStore={subjectsStore} />);
      expect(wrapper.find(Paragraph)).to.have.lengthOf(1);
    });
  });

  describe('when there is a current subject', function() {
    let wrapper;
    before(function () {
      subjectsStore.setSubjects({
        subjects: [{ locations: [{ 'image/png': 'https://mock-image-source.com/image.png' }] }],
        meta: {}
      });
      console.log(subjectsStore.subjects)      
    });

    it('should render an Image component', function() {
      const wrapper = mount(<SubjectViewer subjectsStore={subjectsStore} />);      
      expect(wrapper.find(Image)).to.have.lengthOf(1);
    });
  });
});
