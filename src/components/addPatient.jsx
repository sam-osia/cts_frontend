import React, {useState} from "react";
import PatientsService from "../services/PatientsService";

const AddPatient = () => {
    const initialPatientState = {
        // Patient Information
        MRN: "",
        BirthDate: "",
        PreOp: "",
        Diagnosis: "",
        DiagnosisAdditional: "",
        DiagnosisNotes: "",

        // Treatment Information
        SurgeryDate: "",
        SurgeryType: "",
        HelmetingStartDate: "",

        // Follow-Up Information
        FollowUpJohn: "",
        FollowUpJohnReason: "",
        FollowUpEpic: "",
        FollowUpEpicReason: "",

        // For Jaryd
        JarydReview: "",
        JarydReviewReason: "",

        // Scan Information
        ClinicType: "",
        AndroidId: "",
        AndroidDate: "",
        iPhoneId: "",
        iPhoneDate: "",
        Md3dParentFolder: "",
        Md3dObjFolder: "",
        Md3dDate: "",

        // Skin Tone Information
        SkinToneId: "",
        ExcludeSkinTone: "",
        ExcludeSkinToneReason: "",

        // Exclude Patient
        ExcludePatient: "",
        ExcludePatientReason: "",
    }

    const [patient, setPatient] = useState(initialPatientState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        console.log(event.target)
        const {name, value} = event.target;
        setPatient({...patient, [name]: value});
    }

    const savePatient = () => {
        var data = {
            MRN: patient.MRN,
            Age: patient.Age,
            Diagnosis: patient.Diagnosis,
            AndroidID: patient.AndroidId,
            iPhoneID: patient.iPhoneId,
        }

        PatientsService.create(data)
            .then(response => {
                setPatient({
                    MRN: response.data.MRN,
                    Age: response.data.Age,
                    Diagnosis: response.data.Diagnosis,
                    AndroidID: response.data.AndroidID,
                    iPhoneID: response.data.iPhoneID,
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const newPatient = () => {
        setPatient(initialPatientState);
        setSubmitted(false);
    }


    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newPatient}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group mt-lg-4">
                        <label htmlFor="MRN"><b>MRN</b></label>
                        <input
                            type="text"
                            className="form-control mb-4"
                            id="MRN"
                            required
                            value={patient.MRN}
                            onChange={handleInputChange}
                            name="MRN"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Age"><b>Age</b></label>
                        <input
                            type="text"
                            className="form-control mb-4"
                            id="Age"
                            required
                            value={patient.Age}
                            onChange={handleInputChange}
                            name="Age"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Diagnosis"><b>Diagnosis</b></label>
                        <select
                            className="form-control mb-4 text-center"
                            id="Diagnosis"
                            required
                            value={patient.Diagnosis}
                            onChange={handleInputChange}
                            name="Diagnosis"
                        >
                            <option value="Sagittal">Sagittal</option>
                            <option value="Metopic">Metopic</option>
                            <option value="Unicoronal">Unicoronal</option>
                            <option value="Plagiocephaly">Plagiocephaly</option>
                            <option value="Normal">Normal</option>
                            <option value="Other">Other</option>
                        </select>

                    </div>
                    <div className="form-group">
                        <label htmlFor="AndroidID"><b>Android ID</b></label>
                        <input
                            type="text"
                            className="form-control mb-4"
                            id="AndroidID"
                            required
                            value={patient.AndroidId}
                            onChange={handleInputChange}
                            name="AndroidID"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="iPhoneID"><b>iPhone ID</b></label>
                        <input
                            type="text"
                            className="form-control mb-4"
                            id="iPhoneID"
                            required
                            value={patient.iPhoneId}
                            onChange={handleInputChange}
                            name="iPhoneID"
                        />
                    </div>

                    <button onClick={savePatient} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};


export default AddPatient;