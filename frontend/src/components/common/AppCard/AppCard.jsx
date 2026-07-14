import { Card } from "antd";

export default function AppCard({

    title,

    children

}){

return(

<Card

title={title}

>

{children}

</Card>

)

}