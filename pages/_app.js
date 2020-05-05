import { Provider } from 'react-redux';
import LayoutContainer from '../components/layout';
import configureStore from '../redux';
import '../styles/global.scss';

const store = configureStore();

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <LayoutContainer>
          <Component {...pageProps} />
      </LayoutContainer>
    </Provider>
  );
}
