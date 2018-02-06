import React from 'react';
import { Box } from 'grommet';
import SubjectViewer from './components/SubjectViewer';
import Task from './components/Task';

export default function Classifier() {
  return (
    <Box direction="row" justify="center">
      <SubjectViewer />
      <Task />
    </Box>
  );
}
