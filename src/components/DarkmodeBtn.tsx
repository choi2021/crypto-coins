import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { isDarkState } from '../atoms';

const ToggleBtn = styled.button<{ isActive: boolean }>`
  font-size: 1.1rem;
  background-color: ${(props) => (props.isActive ? 'white' : 'transparent')};
  transition: 0.3s ease-in-out all;
  @media screen and (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 2.5rem;
  border: solid ${(props) => props.theme.accentColor} 3px;
  border-radius: 1.1em;
  color: ${(props) => props.theme.accentColor};
  ${ToggleBtn}:first-child {
    border-right: solid ${(props) => props.theme.accentColor} 3px;
    border-radius: 1.2em 0 0 1.2em;
  }
  ${ToggleBtn}:last-child {
    border-radius: 0 1.2em 1.2em 0;
  }
  @media screen and (max-width: 600px) {
    height: 2rem;
  }
`;

export default function DarkmodeBtn() {
  const [isDark, setIsDark] = useRecoilState(isDarkState);
  const toggleDark = () => setIsDark(true);
  const toggleLight = () => setIsDark(false);
  return (
    <Wrapper>
      <ToggleBtn onClick={toggleLight} isActive={!isDark}>
        Light
      </ToggleBtn>
      <ToggleBtn onClick={toggleDark} isActive={isDark}>
        Dark
      </ToggleBtn>
    </Wrapper>
  );
}
