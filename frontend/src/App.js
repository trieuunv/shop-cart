import './App.css';
import './styles/_layout.scss';
import Routes from './routes';
import Header from './components/Header';

const App = () => {
  return (
    <div className='page'>
      <Header />
      <div id='wrap'>
        <main id='main'>
          <div id='contents'>
            <Routes />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;