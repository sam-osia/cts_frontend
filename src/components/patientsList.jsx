import React, {useState, useEffect, useMemo, useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import PatientsService from "../services/PatientsService";
import {useTable, useSortBy, usePagination} from "react-table";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {TextField} from "@mui/material";

const PatientsList = (props) => {
    let navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [searchMRN, setSearchMRN] = useState("");
    const patientsRef = useRef();

    patientsRef.current = patients;

    useEffect(() => {
        retrievePatients();
    }, []);

    const onChangeSearchMRN = e => {
        const searchMRN = e.target.value;
        setSearchMRN(searchMRN);
    }

    const findByMRN = () => {
        PatientsService.findByMRN(searchMRN)
            .then(response => {
                setPatients(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const retrievePatients = () => {

        PatientsService.getAll()
            .then(response => {
                setPatients(response.data.patients);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

      const refreshList = () => {
        retrievePatients();
    };

    const openPatient = (rowIndex) => {
        const id = patientsRef.current[rowIndex].id;
        props.history.push("/patients/" + id);
    }

    const deletePatient = (rowIndex) => {
        const id = patientsRef.current[rowIndex].id;
        PatientsService.remove(id)
            .then(response => {
                props.history.push("/patients");

                let newPatients = [...patientsRef.current];
                newPatients.splice(rowIndex, 1);

                setPatients(newPatients);
            })
            .catch(e => {
                console.log(e);
            }
        );
    };

    function openImage(rowIdx) {
        let patient = patientsRef.current[rowIdx];
        let androidID = patient.AndroidID;
        let path = "/image/" + androidID;
        // props.history.push(path);
        navigate(path);
    }

    const handleBirthDateChange = (newValue) => {

    }

    const columns = useMemo(
        () => [
            {
                Header: "MRN",
                accessor: "MRN"
            },
            {
                Header: "Birth Date",
                accessor: "BirthDate"
            },
            {
                Header: "Diagnosis",
                accessor: "Diagnosis"
            },
            {
                Header: "Android ID",
                accessor: "AndroidID",
                Cell: (props) => {
                    const rowIdx = props.row.id;
                    return (
                        <div>
                            <Link
                                to={"/images/" + props.value}
                            >
                                {props.value}
                            </Link>
                        </div>
                    );
                }
            },
            {
                Header: "iPhone ID",
                accessor: "iPhoneID"
            },
            {
                Header: "Actions",
                accessor: "actions",
                Cell: (props) => {
                    const rowIdx = props.row.id;
                    return (
                        <div>
                            <span onClick={() => openPatient(rowIdx)} className={"me-3"}>
                                <i className={"far fa-edit action mr-2"} />
                            </span>

                            <span onClick={() => deletePatient(rowIdx)}>
                                <i className={"fas fa-trash action ml-2"} />
                            </span>
                        </div>
                    );
                }
            }
        ],
        []
    );
    const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: patients,
  },
  useSortBy);

    return (
        <div className="list row">
            <div className="col-md-6">
                <div className={"input-group mb-3"}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by MRN"
                        aria-label="Search by MRN"
                        value={searchMRN}
                        onChange={onChangeSearchMRN}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByMRN}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-12 list">
                <table className="table table-striped table-bordered"
                       {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render("Header")}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? " 🔽"
                                                    : " 🔼"
                                                : ""}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                    })}
                                </tr>
                            );
                        }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PatientsList;