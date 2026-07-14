import { Table } from "antd";

export default function AppTable({

columns,

dataSource,

loading

}){

return(

<Table

columns={columns}

dataSource={dataSource}

loading={loading}

pagination={{

pageSize:10

}}

rowKey="id"

/>

)

}