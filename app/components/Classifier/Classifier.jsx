import React from 'react';
import { Box } from 'grommet';
import SubjectViewer from './components/SubjectViewer';
import Workflow from './components/Workflow';

export default function Classifier() {
  return (
    <Box direction="row" justify="center">
      <SubjectViewer basis="2/3" />
      <Workflow basis="1/3" />
    </Box>
  );
}
