import React, { Fragment } from 'react';
// import { Helmet } from 'react-helmet';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import store from './store';
import { ThemeProvider } from 'styled-components';
import theme from './utils/theme';
import GlobalStyle from './utils/globals';
import Auth0ProviderWithHistory from './Auth/AuthProvider';
import { BrowserRouter} from 'react-router-dom';

import '../node_modules/react-modal-video/scss/modal-video.scss';
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick-theme.css';


ReactDOM.render(
  
  
    <Provider store={store}>
      <ThemeProvider ThemeProvider theme={theme}>
          <Fragment>
          <BrowserRouter>
            <Auth0ProviderWithHistory>
            <App />
              </Auth0ProviderWithHistory>
            </BrowserRouter>
          <GlobalStyle />
        </Fragment>
      </ThemeProvider>
    </Provider>,
document.getElementById('root')
);






