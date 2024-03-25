import styled from 'styled-components';
import { Button } from 'components/Button/Button';

export const AbsoluteFillSpace = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const PuzzleButton = styled(Button)`
  flex: 1;
  margin: 12px;
  font-size: 1.5rem;
  color: #2df6a7;
  background: rgb(11, 10, 10);
  border: 1px solid #2df6a7;
  padding: 1rem 2rem;
  border-radius: 12px;
  cursor: pointer;

  &:disabled {
    color: gray;
    border-color: gray;
  }
`;

export const Overlay = styled.div<{ visible?: boolean; blur?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ visible }) => (visible ? 100 : -1)};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: ${({ blur }) => (blur ? 'blur(10px)' : 'none')};
`;

export const DisplayBlock = styled.div`
  text-align: center;
  align-items: center;
  padding: 50px 0;
  width: 60%;
  height: 500px;

  & > h1 {
    flex: 1;
    color: white;
  }
`;
