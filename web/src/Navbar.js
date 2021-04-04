import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link, withRouter } from 'react-router-dom';
import { FolderOpen } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {},
  link: {
    textDecoration: 'none',
  },
});

function CustomNavbar(props) {
  const classes = useStyles();

  const [locations, setLocations] = React.useState([]);

  useEffect(() => {
    console.log(props.location);

    //Get a list of non-empty links in the url
    setLocations(props.location.pathname.split('/').filter(s => s.length > 0))
  }, [props.location]);
  

  return (
    <Breadcrumbs className={classes.root} aria-label="breadcrumb">
      <Link className={classes.link} to='/'>
        <Chip
          label='Home'
          icon={<HomeIcon fontSize='small' />}
        />
      </Link>
      {
        locations.map((location, index) => (
            <Link
              key={`link-${index}`}
              className={classes.link}
              to={locations.slice(0, index + 1).join('/')}
            >
              <Chip
                label={location}
                icon={<FolderOpen fontSize='small' />}
              />
            </Link>
          )
        )
      }
    </Breadcrumbs>
  );
}

export default withRouter(props => <CustomNavbar {...props} />);
