import { Button, Card, Form, Input, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function Login() {
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f5f7fa"
            }}
        >
            <Card style={{ width: 400 }}>
                <Title level={3} style={{ textAlign: "center" }}>
                    Enterprise Employee Management System
                </Title>

                <Form layout="vertical">
                    <Form.Item
                        label="Username"
                        name="username"
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Enter username"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Enter password"
                        />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                    >
                        Login
                    </Button>
                </Form>
            </Card>
        </div>
    );
}