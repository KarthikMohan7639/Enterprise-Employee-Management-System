import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { memo } from "react";
import menuItems from "../../../constants/menuItems";

const { Sider } = Layout;

function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    return (

        <Sider
            collapsible
            width={250}
            style={{ minHeight: "100vh" }}
        >

            <div
                style={{
                    color: "#fff",
                    textAlign: "center",
                    padding: 20,
                    fontWeight: "bold",
                    fontSize: 22
                }}
            >
                EEMS
            </div>

            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[location.pathname]}
                items={menuItems}
                onClick={({ key }) => navigate(key)}
            />

        </Sider>

    );

}

export default memo(Sidebar);