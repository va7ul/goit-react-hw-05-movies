import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0px 20px;
`;

export const Header = styled.header`
  padding-top: 10px;
`;

export const List = styled.ul`
  display: flex;
  gap: 20px;
`;

export const StyledLink = styled(NavLink)`
  color: black;
  font-weight: 700;
  font-size: 24px;

  &.active {
    color: orange;
  }
`;
