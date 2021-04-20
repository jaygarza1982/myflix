import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import MediaCard from './MediaCard';
import { useParams, useRouteMatch } from 'react-router-dom';

export default function FileListing(props) {
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
        <Grid container justify={'center'}>
            {
                files[folderPath] ? files[folderPath].map((file, index) => {
                    return (
                        <Grid key={`file-${index}`} item style={{ margin: '10px' }} xs={12} md={3} lg={3} xl={3}>
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