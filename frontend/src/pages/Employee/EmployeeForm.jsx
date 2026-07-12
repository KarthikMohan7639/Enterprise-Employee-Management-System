import { Form, Input, Modal, Select, DatePicker, InputNumber } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";

const { Option } = Select;

export default function EmployeeForm({
    open,
    onCancel,
    onFinish,
    loading,
    employee = null
}) {

    const [form] = Form.useForm();

    useEffect(() => {

        if (employee) {

            form.setFieldsValue({
                ...employee,
                joiningDate: employee.joiningDate
                    ? dayjs(employee.joiningDate)
                    : null
            });

        } else {

            form.resetFields();

        }

    }, [employee, form]);
    
    

    return (
        <Modal
            title={employee ? "Edit Employee" : "Add Employee"}
            open={open}
            onCancel={onCancel}
            onOk={() => form.submit()}
            confirmLoading={loading}
            okText={employee ? "Update" : "Save"}
            destroyOnHidden
            width={700}
        >
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    name="employeeCode"
                    label="Employee Code"
                    rules={[
                        {
                            required: true,
                            message: "Employee Code is required"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[
                        {
                            required: true,
                            message: "First Name is required"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[
                        {
                            required: true,
                            message: "Last Name is required"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            type: "email"
                        },
                        {
                            required: true
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="department"
                    label="Department"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="designation"
                    label="Designation"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="salary"
                    label="Salary"
                >
                    <InputNumber
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="Gender"
                >
                    <Select>
                        <Option value="MALE">Male</Option>
                        <Option value="FEMALE">Female</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Status"
                >
                    <Select>
                        <Option value="ACTIVE">Active</Option>
                        <Option value="INACTIVE">Inactive</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="joiningDate"
                    label="Joining Date"
                >
                    <DatePicker
                        style={{ width: "100%" }}
                    />
                </Form.Item>

            </Form>
        </Modal>
    );
}