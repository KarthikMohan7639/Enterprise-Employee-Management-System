import { Layout, Input, Avatar, Badge, Dropdown, message } from "antd";
import {
    BellOutlined,
    UserOutlined,
    LogoutOutlined
} from "@ant-design/icons";

import { memo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../../redux/auth/authSlice";
import { storage } from "../../../utils/storage";

const { Header } = Layout;

function HeaderComponent() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {

        storage.clear();

        dispatch(logout());

        message.success("Logged out successfully");

        navigate("/");

    };

    const items = [
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Logout",
            onClick: handleLogout
        }
    ];

    return (

        <Header
            style={{
                background: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 20px"
            }}
        >

            <Input.Search
                placeholder="Search..."
                style={{ width: 350 }}
            />

            <div
                style={{
                    display: "flex",
                    gap: 25,
                    alignItems: "center"
                }}
            >

                <Badge count={5}>
                    <BellOutlined style={{ fontSize: 22 }} />
                </Badge>

                <Dropdown
                    menu={{ items }}
                    placement="bottomRight"
                    trigger={["click"]}
                >
                    <Avatar
                        icon={<UserOutlined />}
                        style={{ cursor: "pointer" }}
                    />
                </Dropdown>

            </div>

        </Header>

    );

}

export default memo(HeaderComponent);