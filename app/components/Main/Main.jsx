import React, { createElement } from 'react';
import { routeNode } from 'react-router5';

import { components } from '../../routes';
import NotFound from './NotFound';

function Main(props) {
  const { route } = props
  const segment = route.name.split('.')[0];

  return createElement(components[segment] || NotFound);
}

export default routeNode('')(Main);
