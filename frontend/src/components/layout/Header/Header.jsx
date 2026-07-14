import { Layout, Input, Avatar, Badge } from "antd";
import {
  BellOutlined,
  UserOutlined
} from "@ant-design/icons";

import { memo } from "react";

const { Header } = Layout;

function HeaderComponent() {
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

        <Avatar icon={<UserOutlined />} />
      </div>
    </Header>
  );
}

export default memo(HeaderComponent);