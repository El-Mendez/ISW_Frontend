import {createGlobalStyle} from 'styled-components';

export const lightTheme = {
  body: '#ede9e0',
  fontColor: 'black',
};

export const darkTheme = {
  body: '#252727',
  fontColor: 'white',
};

export const GlobalStyles = createGlobalStyle`

    body {
        background-color: ${(props) => props.theme.body};
    }

`