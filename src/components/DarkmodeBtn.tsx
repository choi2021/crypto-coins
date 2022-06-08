import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { isDarkState } from '../atoms';

const ToggleBtn = styled.button<{ isActive: boolean }>`
  font-size: 1.1rem;
  background-color: ${(props) => (props.isActive ? 'white' : 'transparent')};
  transition: 0.3s ease-in-out all;
`;

const Wrapper = styled.div`
  position: absolute;
  height: 2rem;
  right: 0;
  top: 50%;
  transform: translateY(-40%);
  display: flex;
  border: solid ${(props) => props.theme.accentColor} 3px;
  border-radius: 1em;
  color: ${(props) => props.theme.accentColor};
  ${ToggleBtn}:first-child {
    border-right: solid ${(props) => props.theme.accentColor} 3px;
    border-radius: 0.7em 0 0 0.7em;
  }
  ${ToggleBtn}:last-child {
    border-radius: 0 0.7em 0.7em 0;
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
