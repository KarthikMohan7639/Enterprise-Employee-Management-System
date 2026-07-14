import {
    DashboardOutlined,
    TeamOutlined,
    ApartmentOutlined,
    IdcardOutlined,
    SafetyCertificateOutlined
} from "@ant-design/icons";

const menuItems = [

    {
        key: "/dashboard",
        icon: <DashboardOutlined />,
        label: "Dashboard"
    },

    {
        key: "/employee",
        icon: <TeamOutlined />,
        label: "Employees"
    },

    {
        key: "/departments",
        icon: <ApartmentOutlined />,
        label: "Departments"
    },

    {
        key: "/designations",
        icon: <IdcardOutlined />,
        label: "Designations"
    },

    {
        key: "/roles",
        icon: <SafetyCertificateOutlined />,
        label: "Roles"
    }

];

export default menuItems;