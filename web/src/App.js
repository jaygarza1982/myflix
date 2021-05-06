import './App.css';
import FileList from './components/FileListing';
import { Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import VideoViewer from './components/Video';
import Login from 'components/Login';
import Register from 'components/Register';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/video/:video+' component={VideoViewer} />
        <Route path='/:folder+' component={FileList} />
        <Route path='/' component={FileList} />
      </Switch>
    </div>
  );
}

export default App;
