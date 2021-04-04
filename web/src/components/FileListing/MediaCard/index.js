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

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const getTime = date => {
    const yearMonthDay = new Date(date).toISOString().split('T')[0];
    const time = new Date(date).toISOString().split('T').pop().split('.')[0];
    
    return {YMD: yearMonthDay, time: time};
}

export default function MediaCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={`/api/video-utils/export-from-video?video=${props.filename}`}
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                        {props.filename}
                    </Typography>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        {(props.size / 1000000).toFixed(2)} MB
                    </Typography>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        { getTime(props.created).YMD } { getTime(props.created).time }
                    </Typography>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        { props.directory ? <FolderOpen /> : <Description /> }
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size='small' color='primary'>
                    Play
                </Button>
                {
                    props.directory ? (
                        <Button size='small' color='primary'>
                            Browse
                        </Button>
                    ) : ''
                }
            </CardActions>
        </Card>
    );
}