import React, { memo } from 'react';
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
        {LINKS.map((item, id) => (
          <li key={id}>
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

export default memo(Nav);
