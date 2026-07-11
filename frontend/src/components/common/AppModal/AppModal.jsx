import { Modal } from "antd";

export default function AppModal({

title,

open,

children,

onOk,

onCancel

}){

return(

<Modal

title={title}

open={open}

onOk={onOk}

onCancel={onCancel}

>

{children}

</Modal>

)

}