import React from 'react';
import { BaseLink, withRoute } from 'react-router5';
import styled from 'styled-components';
import { Box } from 'grommet';

const StyledLink = styled(BaseLink)`
  color: white;
  margin-right: 1ch;

  &:hover {
    color: lightgrey;
  }
  
  &.active {
    font-weight: bold;
  }
`;

// Example using BaseLink and withRoute HOC
function Nav(props) {
  const { router } = props;

  return (
    <Box tag="nav" align="center" direction="row">
      <StyledLink router={router} routeName="home" routeOptions={{ reload: true }}>Home</StyledLink>
      <StyledLink router={router} routeName="about" routeOptions={{ reload: true }}>About</StyledLink>
    </Box>
  );
}

export default withRoute(Nav);
