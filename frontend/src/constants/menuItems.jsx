import {

DashboardOutlined,

TeamOutlined,

ApartmentOutlined,

CalendarOutlined,

ScheduleOutlined,

DollarOutlined,

FileTextOutlined,

SettingOutlined

} from "@ant-design/icons";

const menuItems=[

{

key:"dashboard",

label:"Dashboard",

icon:<DashboardOutlined/>,

path:"/dashboard"

},

{

key:"employee",

label:"Employee",

icon:<TeamOutlined/>,

path:"/employee"

},

{

key:"department",

label:"Department",

icon:<ApartmentOutlined/>,

path:"/department"

},

{

key:"attendance",

label:"Attendance",

icon:<ScheduleOutlined/>,

path:"/attendance"

},

{

key:"leave",

label:"Leave",

icon:<CalendarOutlined/>,

path:"/leave"

},

{

key:"payroll",

label:"Payroll",

icon:<DollarOutlined/>,

path:"/payroll"

},

{

key:"reports",

label:"Reports",

icon:<FileTextOutlined/>,

path:"/reports"

},

{

key:"settings",

label:"Settings",

icon:<SettingOutlined/>,

path:"/settings"

}

]

export default menuItems;