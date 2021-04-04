import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import MediaCard from './MediaCard';

class FileListing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            folderPath: '',
            files: [],
        };
    }

    updateFiles() {
        this.setState({ files: [] }, () => {
            fetch(`/api/files${this.state.folderPath === '' ? '' : `?dir=${this.state.folderPath}`}`).then(resp => {
                resp.json().then(json => {
                    this.setState({ files: json });
                });
            });
        });
    }

    updateFolderPath = newPath => {
        console.log('Update folder ', newPath);
        this.setState({ folderPath: newPath }, () => {
            this.updateFiles();
        });
    }

    componentDidMount() {
        this.updateFiles();
    }

    render() {
        return (
            <Grid container justify={'center'}>
                {
                    this.state.files.map((file, index) => (
                        <Grid key={`file-${index}`} item style={{ margin: '10px'}} xs={12} md={3} lg={3} xl={3}>
                            <MediaCard
                                filename={file.filename}
                                directory={file.directory}
                                size={file.size}
                                created={file.created}
                                updateFolderFunction={this.updateFolderPath.bind(this, file.filename)}
                                folderPath={this.state.folderPath}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        );
    }
}

export default FileListing;