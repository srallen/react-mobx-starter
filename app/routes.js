import About, { Team } from './components/About';
import Home from './components/Home';

export default [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about', children: [
    { name: 'team', path: '/team' }
  ] },
];

export const components = {
  about: About,
  'about.team': Team,
  home: Home
};
