import React from 'react';
import { BaseLink, withRoute } from 'react-router5';

function Nav(props) {
  const { router } = props;

  return (
    <nav>
      <BaseLink router={router} routeName='home' routeOptions={{ reload: true }}>Home</BaseLink>
      <BaseLink router={router} routeName='about'>About</BaseLink>
    </nav>
  );
}

export default withRoute(Nav);
