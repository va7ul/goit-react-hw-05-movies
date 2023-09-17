import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const Wrapper = styled.div`
  margin: 20px 0;
  display: flex;
  gap: 24px;
`;

export const Image = styled.img`
  width: 250px;
  height: 375px;
`;

export const List = styled.ul`
  display: flex;
  gap: 16px;
`;

export const Text = styled.p`
  margin-top: 10px;
`;

export const LinkBtn = styled(Link)`
  max-width: 100px;
  display: flex;
  align-items: center;
  gap: 5px;
`;
