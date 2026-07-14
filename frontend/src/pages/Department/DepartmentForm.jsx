import { Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";

const { TextArea } = Input;
const { Option } = Select;

export default function DepartmentForm({
    open,
    onCancel,
    onFinish,
    loading,
    department = null
}) {

    const [form] = Form.useForm();

    useEffect(() => {

        if (department) {
            form.setFieldsValue(department);
        } else {
            form.resetFields();
        }

    }, [department, form]);

    return (

        <Modal
            title={department ? "Edit Department" : "Add Department"}
            open={open}
            onCancel={onCancel}
            onOk={() => form.submit()}
            confirmLoading={loading}
            okText={department ? "Update" : "Save"}
            width={600}
        >

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >

                <Form.Item
                    name="departmentCode"
                    label="Department Code"
                    rules={[
                        {
                            required: true,
                            message: "Department Code is required"
                        }
                    ]}
                >
                    <Input placeholder="DEP001" />
                </Form.Item>

                <Form.Item
                    name="departmentName"
                    label="Department Name"
                    rules={[
                        {
                            required: true,
                            message: "Department Name is required"
                        }
                    ]}
                >
                    <Input placeholder="Engineering" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                >
                    <TextArea
                        rows={4}
                        placeholder="Department Description"
                    />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Status"
                    initialValue="ACTIVE"
                >
                    <Select>

                        <Option value="ACTIVE">
                            Active
                        </Option>

                        <Option value="INACTIVE">
                            Inactive
                        </Option>

                    </Select>
                </Form.Item>

            </Form>

        </Modal>

    );

}