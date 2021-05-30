import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link, withRouter } from 'react-router-dom';
import { FolderOpen } from '@material-ui/icons';
import UsernameContext from 'components/Contexts/username-context';

const useStyles = makeStyles({
  root: {
    padding: '10px',
  },
  link: {
    textDecoration: 'none',
  },
});

function CustomNavbar(props) {
  const classes = useStyles();

  const [locations, setLocations] = React.useState([]);

  useEffect(() => {
    //Get a list of non-empty links in the url
    setLocations(props.location.pathname.split('/').filter(s => s.length > 0))
    let local = props.location.pathname.split('/').filter(s => s.length > 0);
    console.log(local.slice(0, local.length).join('/'));
  }, [props.location]);

  const { username } = useContext(UsernameContext);
  
  return (
    <>
    <div>Username: {username}</div>
    <Breadcrumbs className={classes.root} aria-label="breadcrumb">
      <Link className={classes.link} to='/'>
        <Chip
          label='Home'
          icon={<HomeIcon fontSize='small' />}
        />
      </Link>
      {/* <Link
        className={classes.link}
        to={locations.slice(0, locations.length - 1).join('/')}
      >
        <Chip
          label={locations[locations.length - 2]}
          icon={<FolderOpen fontSize='small' />}
        />
      </Link> */}
    </Breadcrumbs>
    </>
  );
}

export default withRouter(props => <CustomNavbar {...props} />);
