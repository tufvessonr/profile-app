import Loader from 'react-loader-spinner';
import styled from 'styled-components';

const LoaderContainer= styled.div`
  margin: auto;
  height: fit-content;
  width: fit-content;

  svg {
    color: ${props => props.theme.background.default};
    fill: ${props => props.theme.background.default};
  }
`;

interface IAudioLoader{
  size?: number;
}

export const AudioLoader = (props: IAudioLoader) => {  
  const size = props.size || 80;
  
  return (
    <LoaderContainer>
      <Loader  type="Bars" height={size} width={size} />
    </LoaderContainer>
  );
}