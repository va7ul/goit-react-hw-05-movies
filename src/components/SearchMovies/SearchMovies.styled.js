import { styled } from 'styled-components';

export const List = styled.ul`
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fit, 200px);
  gap: 24px;
`;

export const FilmName = styled.h3`
  text-align: center;
  margin: 20px 0;
`;

export const Image = styled.img`
  height: 300px;
`;
