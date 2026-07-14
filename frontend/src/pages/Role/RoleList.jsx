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

import RoleForm from "./RoleForm";

import {
    fetchRoles,
    createRole,
    updateRole,
    deleteRole
} from "../../redux/role/roleSlice";

const { Title } = Typography;

export default function RoleList() {

    const dispatch = useDispatch();

    const {
        roles,
        loading,
        page,
        size,
        totalElements
    } = useSelector(state => state.role);

    const [open, setOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {

        dispatch(fetchRoles({
            page: 0,
            size: 10,
            search: ""
        }));

    }, [dispatch]);

    const loadRoles = (pageNo = 0) => {

        dispatch(fetchRoles({
            page: pageNo,
            size: 10,
            search
        }));

    };

    const handleSave = async (values) => {

        try {

            if (selectedRole) {

                await dispatch(updateRole({
                    id: selectedRole.id,
                    role: values
                })).unwrap();

                message.success("Role updated successfully");

            } else {

                await dispatch(createRole(values)).unwrap();

                message.success("Role created successfully");

            }

            setOpen(false);
            setSelectedRole(null);

            loadRoles(page);

        } catch (error) {

            message.error(error);

        }

    };

    const handleDelete = async (id) => {

        try {

            await dispatch(deleteRole(id)).unwrap();

            message.success("Role deleted successfully");

            loadRoles(page);

        } catch (error) {

            message.error(error);

        }

    };

    const columns = [

        {
            title: "Role Code",
            dataIndex: "roleCode"
        },

        {
            title: "Role Name",
            dataIndex: "roleName"
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

                                setSelectedRole(record);
                                setOpen(true);

                            }}
                        />

                    </Tooltip>

                    <Popconfirm
                        title="Delete Role?"
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
                    Roles
                </Title>

                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {

                        setSelectedRole(null);
                        setOpen(true);

                    }}
                >
                    Add Role
                </Button>

            </Space>

            <Input
                placeholder="Search Role..."
                prefix={<SearchOutlined />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onPressEnter={() => loadRoles(0)}
                style={{
                    width: 300,
                    marginBottom: 20
                }}
            />

            <Table
                rowKey="id"
                loading={loading}
                columns={columns}
                dataSource={roles}
                pagination={{
                    current: page + 1,
                    pageSize: size,
                    total: totalElements,
                    onChange: (page) => loadRoles(page - 1)
                }}
            />

            <RoleForm
                open={open}
                role={selectedRole}
                loading={loading}
                onCancel={() => {

                    setOpen(false);
                    setSelectedRole(null);

                }}
                onFinish={handleSave}
            />

        </Card>

    );

}