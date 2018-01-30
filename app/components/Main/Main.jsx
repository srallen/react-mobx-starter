import React, { createElement } from 'react';
import { routeNode } from 'react-router5';

import { components } from '../../routes';
import NotFound from './NotFound';

function Main(props) {
  const { route } = props;

  return createElement(components[route.name] || NotFound);
}

export default routeNode('')(Main);
