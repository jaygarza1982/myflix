import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Description, FolderOpen } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        height: 345,
        position: 'relative',
        backgroundColor: '#373737',
        color: '#fff',
    },
    media: {
        height: 140,
    },
    link: {
        textDecoration: 'none',
        color: '#252525',
    },
    cardContent: {
        color: '#fff',
    },
    cardInfo: {
        color: '#868686',
    },
    cardActions: {
        position: 'absolute',
        bottom: 0,
    }
});

const getTime = date => {
    const yearMonthDay = new Date(date).toISOString().split('T')[0];
    const time = new Date(date).toISOString().split('T').pop().split('.')[0];
    
    return {YMD: yearMonthDay, time: time};
}

export default function MediaCard(props) {
    const classes = useStyles();

    const serverFilePath = `${props.folderPath === '' ? '' : `${props.folderPath}/`}${props.filename}`;
    const linkTo = `${props.directory ? props.fullPath : `/video/${serverFilePath}`}`;

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <Link className={classes.link} to={linkTo}>
                    <CardMedia
                        className={classes.media}
                        image={`/api/video-utils/export-from-video?video=${serverFilePath}`}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant='h5' component='h2'>
                            {props.filename}
                        </Typography>
                        <Typography className={classes.cardInfo} variant='body2' component='p'>
                            {(props.size / 1000000).toFixed(2)} MB
                        </Typography>
                        <Typography className={classes.cardInfo} variant='body2' component='p'>
                            { getTime(props.created).YMD } { getTime(props.created).time }
                        </Typography>
                        <Typography className={classes.cardInfo} variant='body2' component='p'>
                            { props.directory ? <FolderOpen /> : <Description /> }
                        </Typography>
                    </CardContent>
                </Link>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Button
                    size='small'
                    style={{color: '#d60000'}}
                    component={Link}
                    to={linkTo}
                >
                    { props.directory ? 'Browse' : 'Play' }
                </Button>
            </CardActions>
        </Card>
    );
}