import { styled } from 'styled-components';

export const Title = styled.h2`
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
`;

export const List = styled.ul`
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fit, 200px);
  gap: 24px;
`;

export const Image = styled.img`
  height: 300px;
`;

export const FilmName = styled.h3`
  text-align: center;
  margin: 20px 0;
`;
