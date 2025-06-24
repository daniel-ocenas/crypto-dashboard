import styled from 'styled-components';

export const SViewContainer = styled.div<{ top?: string }>`
  margin-top: ${({ top }) => top};
`;
