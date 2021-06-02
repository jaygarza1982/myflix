import './App.css';
import FileList from './components/FileListing';
import { Route, Switch, withRouter } from 'react-router-dom';
import Navbar from './Navbar';
import VideoViewer from './components/Video';
import Login from 'components/Login';
import Register from 'components/Register';
import { useEffect, useState } from 'react';
import UsernameContext from 'components/Contexts/username-context';
import axios from 'axios';

function App(props) {
  const [username, setUsername] = useState('');

  //Fetch username on load
  useEffect(() => {
    fetch('/api/auth/whoami').then(resp => {
      if (resp.status === 200) {
        console.log('Got username');
        return resp.json();
      }

      return Promise.reject('User not logged in.');
    }).then(json => {
      setUsername(json?.username);
    }).catch(err => {
      props.history.push('/login');
    });
  }, []);

  return (
    <div className="App">
      <UsernameContext.Provider value={{ username, setUsername }}>
        <Navbar />
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/video/:video+' component={VideoViewer} />
          <Route path='/:folder+' component={FileList} />
          <Route path='/' component={FileList} />
        </Switch>
      </UsernameContext.Provider>
    </div>
  );
}

export default withRouter(App);
