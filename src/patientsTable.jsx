import React, {Component} from "react";


class PatientsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patients: []
        }
    }

    componentDidMount() {
        this.updatePatientList();
    }

    updatePatientList = () => {
        fetch('/patients', {   // fetch image from server
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
            }
        ).then(response => response.json())
            .then((data) => {
                console.log(data);
                this.setState({patients: data});
            }
        );
    }

    handleClick = () => {
        let patients = [
            {
                MRN: 123,
                AndroidID: 456,
            },
            {
                MRN: 789,
                AndroidID: 101,
            }
        ];
        this.setState({patients: patients});
    }
    render() {
        return (
            <div>
                <h1>Patients Table</h1>
                <button onClick={this.handleClick}>Click me</button>
            </div>
        );
    }
}

export default PatientsTable;