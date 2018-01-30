import React from 'react';
import { Link } from 'react-router5';

// example of Link and nested route
export default function About(props) {
  return (
    <div>
      <nav><Link routeName="about.team" routeOptions={{ reload: true }}>Team</Link></nav>
      <h1>About</h1>
    </div>
  );
}
