import styled from '@emotion/styled';

export const Container = styled.ul`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  max-height: 550px;
`;

export const Badge = styled.div<{ $isRegistered: boolean }>`
  width: 40px;
  height: 18px;
  border-radius: 4px;
  line-height: 18px;
  text-align: center;
  font-size: 12px;
  color: black;
  background: ${({ $isRegistered, theme }) =>
    $isRegistered ? '#eeccba' : '#D8D8D8'};
`;

export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #222;
`;

export const RightInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 10px;
`;

export const InfoContainer = styled.span`
  font-size: 14px;
  color: #121b4f;
  line-height: 16px;
`;

export const CustomerBox = styled.li`
  display: flex;
  justify-content: space-between;
  min-height: 90px;
  padding: 15px;

  margin: 0 20px 15px 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 10px 10px -3px #d8d8d8;

  &:first-of-type {
    margin-top: 20px;
  }
`;

export const LeftInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Name = styled.h1`
  font-size: 20px;
  font-weight: 500;
`;
