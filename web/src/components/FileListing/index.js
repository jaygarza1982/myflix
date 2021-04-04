import { Button, Grid } from '@material-ui/core';
import { Description, FolderOpen } from '@material-ui/icons';
import React, { Component } from 'react';
import MediaCard from './MediaCard';

class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            folderPath: '/',
            files: [],
        };
    }

    updateFiles() {
        fetch('/api/files').then(resp => {
            resp.json().then(json => {
                this.setState({ files: json });
            });
        });
    }

    componentDidMount() {
        this.updateFiles();
    }

    render() {
        return (
            <Grid container justify={'center'}>
                {
                    this.state.files.map(file => (
                        <Grid item style={{ margin: '10px'}} xs={12} md={3} lg={3} xl={3}>
                            <MediaCard
                                filename={file.filename}
                                directory={file.directory}
                                size={file.size}
                                created={file.created}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        );
    }
}

export default index;