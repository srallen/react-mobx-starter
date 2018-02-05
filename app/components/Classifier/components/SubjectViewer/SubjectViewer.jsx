import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Box, Image } from 'grommet';

@inject('subjectsStore')
@observer
export default class SubjectViewer extends React.Component {
  static propTypes = {
    subjectsStore: PropTypes.shape({
      fetchSubjects: PropTypes.func
    })
  }

  componentDidMount() {
    this.props.subjectsStore.fetchSubjects();
  }

  render() {
    const { currentSubject } = this.props.subjectsStore;
    return (
      <Box>
        <Image 
          fit="contain"
          src="http://via.placeholder.com/500x500"
        />
      </Box>
    );
  }
}
