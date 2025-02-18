import './App.css';
import Routes from './routes';
import LoginModal from './components/LoginModal';

const App = () => {
  return (
    <div className="App">
      <LoginModal />
      <Routes />
    </div>
  );
}

export default App;