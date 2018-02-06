import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Box, Image } from 'grommet';

@inject('subjectsStore')
@observer
export default class SubjectViewer extends React.Component {
  static propTypes = {
    subjectsStore: PropTypes.shape({
      current: PropTypes.object,
      fetchSubjects: PropTypes.func
    })
  }

  static defaultProps = {
    subjectsStore: {
      current: null,
      fetchSubjects: () => {}
    }
  }

  componentDidMount() {
    this.props.subjectsStore.fetchSubjects();
  }

  render() {
    const { current } = this.props.subjectsStore;

    return (
      <Box>
        {current && current.locations &&
          <Image
            fit="contain"
            src={current.locations[0][Object.keys(current.locations[0])[0]]}
          />}
      </Box>
    );
  }
}
