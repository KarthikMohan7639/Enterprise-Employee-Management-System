import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Card,
    Space,
    Table,
    Tag,
    Typography,
    Tooltip,
    Popconfirm,
    message
} from "antd";

import {
    EditOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import EmployeeForm from "./EmployeeForm";

import {
    fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from "../../redux/employee/employeeSlice";

const { Title } = Typography;

export default function EmployeeList() {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const {
        employees,
        loading,
        page,
        size,
        totalElements
    } = useSelector(state => state.employee);

    useEffect(() => {

        dispatch(
            fetchEmployees({
                page: 0,
                size: 10,
                sortBy: "id",
                sortDir: "asc"
            })
        );

    }, [dispatch]);

    const columns = [

        {
            title: "Employee Code",
            dataIndex: "employeeCode",
            key: "employeeCode"
        },

        {
            title: "Full Name",
            dataIndex: "fullName",
            key: "fullName"
        },

        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },

        {
            title: "Department",
            dataIndex: "department",
            key: "department"
        },

        {
            title: "Designation",
            dataIndex: "designation",
            key: "designation"
        },

        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "ACTIVE" ? "green" : "red"}>
                    {status}
                </Tag>
            )
        },
            {
                title: "Actions",
                key: "actions",
                width: 160,
                render: (_, record) => (

                    <Space>

                        <Tooltip title="Edit">

                            <Button
                                type="primary"
                                size="small"
                                icon={<EditOutlined />}
                                onClick={() => {
                                    setSelectedEmployee(record);
                                    setOpen(true);
                                }}
                            />

                        </Tooltip>

                        <Popconfirm
                            title="Delete Employee"
                            description="Are you sure you want to delete this employee?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => {

                                dispatch(deleteEmployee(record.id))
                                    .unwrap()
                                    .then(() => {

                                        message.success("Employee deleted successfully.");

                                    })
                                    .catch((error) => {

                                        console.error(error);
                                        message.error(error);

                                    });

                            }}
                        >

                            <Tooltip title="Delete">

                                <Button
                                    danger
                                    size="small"
                                    icon={<DeleteOutlined />}
                                />

                            </Tooltip>

                        </Popconfirm>

                    </Space>

                )
            }        

    ];

    return (

        <Card>

            <Space
                style={{
                    width: "100%",
                    justifyContent: "space-between",
                    marginBottom: 20
                }}
            >

                <Title level={3}>Employees</Title>

                <Button
                    type="primary"
                    onClick={() => setOpen(true)}
                >
                    Add Employee
                </Button>

            </Space>

            <Table
                rowKey="id"
                loading={loading}
                columns={columns}
                dataSource={employees}
                pagination={{
                    current: page + 1,
                    pageSize: size,
                    total: totalElements
                }}
            />
            <EmployeeForm
                open={open}
                employee={selectedEmployee}
                loading={loading}
                onCancel={() => {

                    setSelectedEmployee(null);
                    setOpen(false);

                }}
                
                onFinish={(values) => {

                    const employee = {
                        ...values,
                        joiningDate: values.joiningDate
                            ? values.joiningDate.format("YYYY-MM-DD")
                            : null
                    };

                    if (selectedEmployee) {

                        dispatch(
                            updateEmployee({
                                id: selectedEmployee.id,
                                employee
                            })
                        )
                            .unwrap()
                            .then(() => {

                                setSelectedEmployee(null);
                                setOpen(false);

                            })
                            .catch(console.error);

                    } else {

                        dispatch(createEmployee(employee))
                            .unwrap()
                            .then(() => {

                                setOpen(false);

                            })
                            .catch(console.error);

                    }

                }}
            />         

        </Card>

    );

}