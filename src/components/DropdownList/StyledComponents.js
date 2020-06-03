import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  position: relative;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 120px;
  justify-content: space-between;
  margin: 0 30px;

  &:focus {
    outline: none;
  }
`;

export const MenuContiner = styled.div`
  position: absolute;
  width: 100px;
  height: auto;
  padding: 25px;
  top: 50px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  z-index: 100;
  text-align: left;
`;

export const Image = styled.img`
  border-radius: 50%;
  height: 24px;
  width: 24px;
`;

export const Title = styled.p`
  font-size: 14px;
  color: #232323;
  font-weight: bold;
`;

export const MenuItem = styled.p`
  font-size: 14px;
  color: #232323;
  font-weight: bold;
  margin: 20px 0;
`;