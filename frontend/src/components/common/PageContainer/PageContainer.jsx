import { Breadcrumb } from "antd";

export default function PageContainer({

title,

children

}){

return(

<div>

<Breadcrumb

items={[

{

title:"Home"

},

{

title:title

}

]}

/>

<h2

style={{

marginTop:20,

marginBottom:20

}}

>

{title}

</h2>

{children}

</div>

)

}