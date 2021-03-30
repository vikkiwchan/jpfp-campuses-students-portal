import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';

import Main from './Components/Main';
import store from './store/index';

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: yellow,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline>
        <Main />
      </CssBaseline>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
