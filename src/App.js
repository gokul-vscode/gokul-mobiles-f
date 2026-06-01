// import logo from './logo.svg';
import './App.css';
import HomePage from './Pages/HomePage'
import Routing from './Routing/Routing';
import { Provider } from 'react-redux'
import store from './Store/store'

function App() {
  return (
    <>
      <Provider store={store}>
        <Routing />
      </Provider>
    </>
  );
}

export default App;
