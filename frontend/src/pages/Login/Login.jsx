import { useState } from "react";
import { Button, Card, Form, Input, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import AuthService from "../../services/AuthService";
import { storage } from "../../utils/storage";
import { loginStart, loginSuccess, loginFailure } from "../../redux/auth/authSlice";

const { Title } = Typography;

export default function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const handleLogin = async (values) => {
            console.log("Login button clicked");
            console.log(values);

        try {

            setLoading(true);

            dispatch(loginStart());

            const response = await AuthService.login(values);

            const data = response.data;

            storage.setToken(data.accessToken);

            dispatch(loginSuccess(data));

            message.success("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            dispatch(
                loginFailure(
                    error.response?.data?.message ||
                    "Invalid Username or Password"
                )
            );

            message.error(
                error.response?.data?.message ||
                "Login Failed"
            );

        } finally {

            setLoading(false);

        }

    };

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

                <Title
                    level={3}
                    style={{ textAlign: "center" }}
                >
                    Enterprise Employee Management System
                </Title>

                <Form
                    layout="vertical"
                    onFinish={handleLogin}
                >

                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Username is required"
                            }
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Enter username"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Password is required"
                            }
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Enter password"
                        />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                    >
                        Login
                    </Button>

                </Form>

            </Card>

        </div>

    );

}