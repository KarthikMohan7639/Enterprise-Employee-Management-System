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

import DesignationForm from "./DesignationForm";

import {

    fetchDesignations,
    createDesignation,
    updateDesignation,
    deleteDesignation

} from "../../redux/designation/designationSlice";

const { Title } = Typography;

export default function DesignationList() {

    const dispatch = useDispatch();


    const {

        designations,
        loading,
        page,
        size,
        totalElements

    } = useSelector(state => state.designation);

    const [open, setOpen] = useState(false);

    const [selectedDesignation,
        setSelectedDesignation] = useState(null);

    const [search, setSearch] = useState("");


    useEffect(() => {

        dispatch(
            fetchDesignations({

                page: 0,
                size: 10,
                sortBy: "id",
                sortDir: "asc",
                search: ""

            })
        );

    }, [dispatch]);

    const loadDesignations = (pageNo = 0) => {

        dispatch(

            fetchDesignations({

                page: pageNo,
                size: 10,
                sortBy: "id",
                sortDir: "asc",
                search

            })

        );

    };

    const handleSave = async (values) => {

        try {

            if (selectedDesignation) {

                await dispatch(

                    updateDesignation({

                        id: selectedDesignation.id,
                        designation: values

                    })

                ).unwrap();

                message.success(
                    "Designation updated successfully"
                );

            }

            else {

                await dispatch(

                    createDesignation(values)

                ).unwrap();

                message.success(
                    "Designation created successfully"
                );

            }

            setOpen(false);

            setSelectedDesignation(null);

            loadDesignations(page);

        }

        catch (error) {

            message.error(error);

        }

    };

    const handleDelete = async (id) => {

        try {

            await dispatch(
                deleteDesignation(id)
            ).unwrap();

            message.success(
                "Designation deleted successfully"
            );

            loadDesignations(page);

        }

        catch (error) {

            message.error(error);

        }

    };

    const columns = [

        {

            title: "Code",

            dataIndex: "designationCode"

        },

        {

            title: "Designation",

            dataIndex: "designationName"

        },

        {

            title: "Department",

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

                <Tag
                    color={
                        status === "ACTIVE"
                            ? "green"
                            : "red"
                    }
                >

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

                                setSelectedDesignation(record);

                                setOpen(true);

                            }}

                        />

                    </Tooltip>

                    <Popconfirm

                        title="Delete Designation?"

                        onConfirm={() =>
                            handleDelete(record.id)
                        }

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
                    Designations
                </Title>

                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {

                        setSelectedDesignation(null);

                        setOpen(true);

                    }}
                >
                    Add Designation
                </Button>

            </Space>

            <Input
                placeholder="Search Designation..."
                prefix={<SearchOutlined />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onPressEnter={() => loadDesignations(0)}
                style={{
                    width: 300,
                    marginBottom: 20
                }}
            />

            <Table
                rowKey="id"
                loading={loading}
                columns={columns}
                dataSource={designations}
                pagination={{
                    current: page + 1,
                    pageSize: size,
                    total: totalElements,
                    onChange: (page) =>
                        loadDesignations(page - 1)
                }}
            />

            <DesignationForm

                open={open}

                designation={selectedDesignation}

                loading={loading}

                onCancel={() => {

                    setOpen(false);

                    setSelectedDesignation(null);

                }}

                onFinish={handleSave}

            />

        </Card>

    );

}