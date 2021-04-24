import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MediaCard from './MediaCard';
import { useParams, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles({
    mediaCard: {
        transition: 'all 1s',
    }
})

export default function FileListing(props) {
    const classes = useStyles();

    const [files, setFiles] = React.useState({});
    const [folderPath, setFolderPath] = React.useState('');

    const { url } = useRouteMatch();
    const { folder } = useParams();

    //Set our folder path
    useEffect(() => {
        setFolderPath(folder ? folder : '');
    }, [folder]);

    //When folder path is set, reload our media cards with what is in the folder
    useEffect(() => {
        fetch(`/api/files${folderPath === '' ? '' : `?dir=${folderPath}`}`).then(resp => {
            resp.json().then(json => {
                let filesCopy = JSON.parse(JSON.stringify(files));
                filesCopy[folderPath] = json;

                setFiles(filesCopy);
            });
        });
    }, [folderPath]);

    return (
        <Grid style={{ width: '100%', margin: 0}} container justify={'center'} spacing={2}>
            {
                files[folderPath] ? files[folderPath].map((file, index) => {
                    return (
                        <Grid
                            className={classes.mediaCard}
                            style={{animation: `inAnimation ${Math.min(250*(index + 1), 1500)}ms ease-in`}}
                            key={`file-${index}`}
                            item
                            xs={12}
                            md={6}
                            lg={2}
                            xl={3}
                        >
                            <MediaCard
                                filename={file.filename}
                                directory={file.directory}
                                size={file.size}
                                created={file.created}
                                folderPath={folderPath}
                                //Nesting with urls
                                fullPath={`${url.length === 1 ? '' : url}/${file.filename}`}
                            />
                        </Grid>
                    )
                }
                 ) : ''
            }
        </Grid>
    );
}