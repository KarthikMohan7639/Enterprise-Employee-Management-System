import { useEffect, useState } from "react";
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
    Input,
    message
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    SearchOutlined
} from "@ant-design/icons";

import DepartmentForm from "./DepartmentForm";

import {
    fetchDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment
} from "../../redux/department/departmentSlice";

const { Title } = Typography;

export default function DepartmentList() {

    const dispatch = useDispatch();

    const {
        departments,
        loading,
        page,
        size,
        totalElements
    } = useSelector(state => state.department);

    const [open, setOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [search, setSearch] = useState("");

        useEffect(() => {

            dispatch(fetchDepartments({
                page: 0,
                size: 10,
                sortBy: "id",
                sortDir: "asc",
                search: ""
            }));

        }, [dispatch]);

    const loadDepartments = (pageNo = 0) => {

        dispatch(fetchDepartments({
            page: pageNo,
            size: 10,
            sortBy: "id",
            sortDir: "asc",
            search
        }));

    };

    const handleSave = async (values) => {

        try {

            if (selectedDepartment) {

                await dispatch(updateDepartment({
                    id: selectedDepartment.id,
                    department: values
                })).unwrap();

                message.success("Department updated successfully");

            } else {

                await dispatch(createDepartment(values)).unwrap();

                message.success("Department created successfully");

            }

            setOpen(false);
            setSelectedDepartment(null);

            loadDepartments(page);

        } catch (error) {

            message.error(error);

        }

    };

    const handleDelete = async (id) => {

        try {

            await dispatch(deleteDepartment(id)).unwrap();

            message.success("Department deleted successfully");

            loadDepartments(page);

        } catch (error) {

            message.error(error);

        }

    };

    const columns = [

        {
            title: "Department Code",
            dataIndex: "departmentCode"
        },

        {
            title: "Department Name",
            dataIndex: "departmentName"
        },

        {
            title: "Description",
            dataIndex: "description"
        },

        {
            title: "Status",
            dataIndex: "status",
            render: (status) => (
                <Tag color={status === "ACTIVE" ? "green" : "red"}>
                    {status}
                </Tag>
            )
        },

        {
            title: "Actions",
            width: 150,
            render: (_, record) => (

                <Space>

                    <Tooltip title="Edit">

                        <Button
                            type="primary"
                            size="small"
                            icon={<EditOutlined />}
                            onClick={() => {

                                setSelectedDepartment(record);
                                setOpen(true);

                            }}
                        />

                    </Tooltip>

                    <Popconfirm
                        title="Delete Department?"
                        onConfirm={() => handleDelete(record.id)}
                    >

                        <Button
                            danger
                            size="small"
                            icon={<DeleteOutlined />}
                        />

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

                <Title level={3}>
                    Departments
                </Title>

                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {

                        setSelectedDepartment(null);
                        setOpen(true);

                    }}
                >
                    Add Department
                </Button>

            </Space>

            <Input
                placeholder="Search Department..."
                prefix={<SearchOutlined />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onPressEnter={() => loadDepartments(0)}
                style={{
                    width: 300,
                    marginBottom: 20
                }}
            />

            <Table
                rowKey="id"
                loading={loading}
                columns={columns}
                dataSource={departments}
                pagination={{
                    current: page + 1,
                    pageSize: size,
                    total: totalElements,
                    onChange: (page) => loadDepartments(page - 1)
                }}
            />

            <DepartmentForm
                open={open}
                department={selectedDepartment}
                loading={loading}
                onCancel={() => {

                    setOpen(false);
                    setSelectedDepartment(null);

                }}
                onFinish={handleSave}
            />

        </Card>

    );

}