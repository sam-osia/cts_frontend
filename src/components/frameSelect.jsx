import React, {Component} from "react";
import {Checkbox, Slider} from '@mui/material';
import logo from '../logo.svg';
import {Button} from '@mui/material';

class FrameSelect extends Component {
    state = {
        subjectId: "unknown",
        frameNum: 0,
        maxFrameNum: 10,
        depthThreshold: 5000,
        useEdgeDistance: false,
        minEdgeDistance: 1000,
        useAreaFilter: false,
        minArea: 1000,
        filepath: "unknown",
        imageData: logo
    }
    submitImage = () => {
        console.log("submitImage");
        let data = {
            subjectId: this.state.subjectId,
            frameNum: this.state.frameNum,
            depthThreshold: this.state.depthThreshold,
            useEdgeDistance: this.state.useEdgeDistance,
            minEdgeDistance: this.state.minEdgeDistance,
            useMinArea: this.state.useMinArea,
            minArea: this.state.minArea
        };
        fetch('/image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                this.setState({filepath: data.filepath});
                this.setState({imageData: data.imageData});
            }
        );
    };

    componentDidMount() {
        console.log("FrameSelect mounted");
        // get subject id from url
        let url = window.location.href;
        let urlParts = url.split("/");
        let subjectId = urlParts[urlParts.length - 1];
        console.log(subjectId);
        this.setState({subjectId: subjectId}, () => {
            this.requestImage();
            this.requestMaxFrameNum();
        });

    }

    requestMaxFrameNum = () => {
        fetch('/maxFrameNum/' + this.state.subjectId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                this.setState({maxFrameNum: data.maxFrameNum});
            }
        );
    }

    requestImage = () => {
        fetch('/image/' + this.state.subjectId, {   // fetch image from server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    // subjectId: this.state.subjectId,
                    frameNum: this.state.frameNum,
                    depthThreshold: this.state.depthThreshold,
                    useEdgeDistance: this.state.useEdgeDistance,
                    minEdgeDistance: this.state.minEdgeDistance,
                    useMinArea: this.state.useMinArea,
                    minArea: this.state.minArea
                })
            }
        ).then(response => response.blob())
            .then((blob) => {
                this.setState({imageData: URL.createObjectURL(blob)});
            }
        );
    }

    handleUseEdgeDistanceChange = (event) => {
        console.log(event.target.checked);
        this.setState({useEdgeDistance: event.target.checked}, this.requestImage);
    };
    handleInputChange = event => {
        console.log(event.target);
        if (event.target.type === "checkbox") {
            this.setState({ [event.target.name]: event.target.checked }, this.requestImage);
        }
        else {
            this.setState({ [event.target.name]: event.target.value }, this.requestImage);
        }

    }

    render() {
        return (
            <div className="slidecontainer">
                <p>Frame: {this.state.frameNum}</p>
                <Slider
                    name={"frameNum"}
                    value={this.state.frameNum}
                    onChange={this.handleInputChange}
                    aria-labelledby="continuous-slider"
                    min={0}
                    max={this.state.maxFrameNum}
                />
                <p>Depth threshold: {this.state.depthThreshold}</p>
                <Slider
                    name={"depthThreshold"}
                    value={this.state.depthThreshold}
                    onChange={this.handleInputChange}
                    aria-labelledby="continuous-slider"
                    min={0}
                    max={5000}
                />
                <p>
                    <Checkbox
                        name={"useEdgeDistance"}
                        checked={this.state.useEdgeDistance}
                        inputProps={{ 'aria-label': 'controlled' }}
                        onChange={this.handleInputChange}
                    />
                    Minimum edge distance: {this.state.minEdgeDistance}</p>
                <Slider
                    name={"minEdgeDistance"}
                    value={this.state.minEdgeDistance}
                    onChange={this.handleInputChange}
                    aria-labelledby="continuous-slider"
                    min={0}
                    max={1000}
                />
                <img src={this.state.imageData} alt="logo" />
                <br></br>
                <Button sx={{m:5}} variant="contained" onClick={this.submitImage}>Submit</Button>
            </div>
        );
    }
}

export default FrameSelect;