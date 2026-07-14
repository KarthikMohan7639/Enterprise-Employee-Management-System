import { Spin } from "antd";

export default function AppLoader(){

return(

<div

style={{

display:"flex",

justifyContent:"center",

padding:50

}}

>

<Spin

size="large"

/>

</div>

)

}