import About from './components/About';
import Home from './components/Home';

export default [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'about.team', path: '/about/team' }
];

export const components = {
  about: About,
  home: Home
};
