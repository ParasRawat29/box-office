import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavList, LinkStyled } from './Nav.styled';

const LINKS = [
  {
    to: '/',
    text: 'Home',
  },
  {
    to: '/starred',
    text: 'Starred',
  },
];
function Nav() {
  const location = useLocation();

  return (
    <div>
      <NavList>
        {LINKS.map(item => (
          <li>
            <LinkStyled
              to={item.to}
              className={location.pathname === item.to ? 'active' : ''}
            >
              {item.text}
            </LinkStyled>
          </li>
        ))}
      </NavList>
    </div>
  );
}

export default Nav;
