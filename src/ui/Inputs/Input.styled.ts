import styled from 'styled-components';

export const SFloatingLabel = styled.div<{ $float: boolean }>`
  position: relative;
  width: 100%;

  label {
    font-size: ${({ $float }) => ($float ? '10px' : '12px')};
    top: ${({ $float }) => ($float ? '-1px' : '12px')};
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 12px;
    transition: 0.2s ease all;
  }
`;
