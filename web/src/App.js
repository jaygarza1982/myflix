import './App.css';
import FileList from './components/FileListing';
import { Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path='/:folder+' component={FileList} />
        <Route path='/' component={FileList} />
      </Switch>
    </div>
  );
}

export default App;
