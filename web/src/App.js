import './App.css';
import FileList from './components/FileListing';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/:folder+' component={FileList} />
        <Route path='/' component={FileList} />
      </Switch>
    </div>
  );
}

export default App;
