import styled from "styled-components";

export const Loading = styled.div`
  text-align: center;
  padding: 10px 0;
`;

export const Navigator = styled.div`
  display: flex;
  justify-content: center;

  
  @media (max-width: 540px) {

  }
`;

export const NavigatorActions = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
  width: 250px;
  background-color: white;
  border: 1px solid #cccccc;
  paddding: 0 0 10px;
  box-shadow: 1px 8px 11px -6px rgba(82, 82, 82, 0.75);
  -webkit-box-shadow: 1px 8px 11px -6px rgba(82, 82, 82, 0.75);
  -moz-box-shadow: 1px 8px 11px -6px rgba(82, 82, 82, 0.75);

  @media (max-width: 540px) {
    width: 65%;
  }

  @media (max-width: 414px) {
    width: 80%;
  }
`;

export const CurrentPage = styled.div`
  font-size: 20px;
  width: 80px;
  text-align: center;
  padding: 5px 0;
  border-right: 1px solid #cccccc;
  border-left: 1px solid #cccccc;

  @media (max-width: 540px) {
    width: 120px;
  }
`;

export const Previous = styled.div`
  text-align: center;
  padding: 5px 0;
  transition: transform 80ms ease-in;

  :active {
    transform: scale(0.95);
  }
`;

export const Next = styled.div`
  text-align: center;
  padding: 5px 0;
  transition: transform 80ms ease-in;

  :active {
    transform: scale(0.95);
  }
`;

export const SmallView = styled.div`
  width: 320px;
  padding: 0 0 0 10px;

  @media (max-width: 540px) {
    padding: 0;
  }

  @media (max-width: 320px) {
    padding: 0;
  }

  @media (max-width: 280px) {
    padding: 0;
  }
`;
