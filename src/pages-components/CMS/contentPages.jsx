import React, { useCallback, useRef, useState } from 'react'
import AppButton from '../../components/common/AppButton';
import InputField from "../../components/common/InputField";
import FormSelect from "../../components/common/FormSelect";
import FormCheckBox from "../../components/common/Checkbox";
import Divider from "@mui/joy/Divider";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Table from "@mui/joy/Table";
import Link from "@mui/joy/Link";
import Checkbox from "@mui/joy/Checkbox";
import { useSelector } from 'react-redux';
import { Button } from '@mui/joy';

const ContentPages =()=>{

    const [errors, setErrors] = useState({});
    const flightBookingRef = useRef({});
    const agentData = useSelector((state) => state.user.loginUser);
    const [selected, setSelected] = useState([]);
    const [agencies, setAgencies] = useState([]);
    const agentID = agentData;

    const handleInputChange = useCallback((event) => {
        const { name, value } = event.target;
        flightBookingRef.current[name] = value;
    }, []);




    const formFields = [
        {
            component: InputField,
            label: "Page Name",
            name: "pageName",
            error: errors.pageName,

        },
        {
            component: FormSelect,
            label: "Language",
            name: "language",
            error: errors.language,

        },
];

    return(
        <div>
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
            }}
        >
            {formFields.map(
                ({ component: Field, label, name, error, placeholder }, index) => (
                    <Box
                        key={index}
                        sx={{
                            flexBasis: "calc(33.333% - 16px)",
                            flexGrow: 0,
                            flexShrink: 0,
                        }}
                    >
                        <Field
                            label={label}
                            name={name}
                            fullWidth
                            onChange={handleInputChange}
                            error={error}
                            placeholder={placeholder}
                        />
                        
                    </Box>
                    
                )
            )}
        </Box>
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 4,
                mt: 3,
            }}
        >
           
        </Box>
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mt: 3,
            }}
        >
            <AppButton
                text="Reset"
                variant="outlined"
                color="#581E47"
                bgColor="#581E47"
            />
            <AppButton
                text="Search"
                variant="solid"
                color="#fff"
                bgColor="#581E47"
            />
        </Box>
        {console.log(flightBookingRef)}

        <Divider sx={{ mt: 3 }} />

        <Sheet
            className="OrderTableContainer"
            variant="outlined"
            sx={{
                display: { xs: "none", sm: "initial" },
                width: "100%",
                borderRadius: "sm",
                flexShrink: 1,
                overflow: "auto",
                minHeight: 0,
            }}
        >
            <Table
                aria-labelledby="tableTitle"
                stickyHeader
                hoverRow
                sx={{
                    "--TableCell-headBackground":
                        "var(--joy-palette-background-level1)",
                    "--Table-headerUnderlineThickness": "1px",
                    "--TableRow-hoverBackground":
                        "var(--joy-palette-background-level1)",
                    "--TableCell-paddingY": "4px",
                    "--TableCell-paddingX": "8px",
                }}
            >
                <thead>
                    <tr>
                        <th>
                            <Checkbox
                                size="sm"
                                indeterminate={
                                    selected.length > 0 && selected.length !== agencies.length
                                }
                                checked={selected.length === agencies.length}
                                onChange={(event) =>
                                    setSelected(
                                        event.target.checked ? agencies.map((row) => row.id) : []
                                    )
                                }
                            />
                        </th>
                        <th>Page ID</th>
                        <th>
Page Name
                            
                        </th>
                        <th>Language</th>
                        <th >Updated By</th>
                        <th>Updated On</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th />
                    </tr>
                </thead>
                {agencies.length > 0 && (
                    <tbody>
                        {stableSort(agencies, getComparator(order, "userName"))?.map(
                            (row) => (
                                <tr key={row.agencyName}>
                                    <td>
                                        <Checkbox
                                            size="sm"
                                            checked={selected.includes(row.userName)}
                                            onChange={(event) =>
                                                setSelected(
                                                    event.target.checked
                                                        ? [...selected, row.userName]
                                                        : selected.filter((name) => name !== row.userName)
                                                )
                                            }
                                        />
                                    </td>
                                    <td>{row.personName}</td>
                                    <td>Active</td>
                                    <td>{row?.availableLimit}</td>
                                    <td>{row.country}</td>
                                    <td>{row.groupArCode}</td>
                                    <td>{row.agencyType}</td>
                                    <td>{row.arCode}</td>
                                    <td>
                                        <RowMenu />
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                )}
            </Table>
        </Sheet>
    </div>
    )
}

export default ContentPages;