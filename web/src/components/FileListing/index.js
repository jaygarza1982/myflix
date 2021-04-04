import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import MediaCard from './MediaCard';

export default function FileListing(props) {
    const [files, setFiles] = React.useState([]);
    const [folderPath, setFolderPath] = React.useState('');

    useEffect(() => {
        setFolderPath(props.match.params.folder ? props.match.params.folder : '');
    }, [props.match.params.folder]);

    useEffect(() => {
        fetch(`/api/files${folderPath === '' ? '' : `?dir=${folderPath}`}`).then(resp => {
            resp.json().then(json => {
                setFiles(json);
            });
        });
    }, [folderPath]);

    return (
        <Grid container justify={'center'}>
            {
                files.map((file, index) => (
                    <Grid key={`file-${index}`} item style={{ margin: '10px' }} xs={12} md={3} lg={3} xl={3}>
                        <MediaCard
                            filename={file.filename}
                            directory={file.directory}
                            size={file.size}
                            created={file.created}
                            folderPath={folderPath}
                            currentPath={folderPath}
                        />
                    </Grid>
                ))
            }
        </Grid>
    );
}