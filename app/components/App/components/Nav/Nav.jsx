import React from 'react';
import { BaseLink, withRoute } from 'react-router5';

// Example using BaseLink and withRoute HOC
function Nav(props) {
  const { router } = props;

  return (
    <nav>
      <BaseLink router={router} routeName='home' routeOptions={{ reload: true }}>Home</BaseLink>
      <BaseLink router={router} routeName='about' routeOptions={{ reload: true }}>About</BaseLink>
    </nav>
  );
}

export default withRoute(Nav);
