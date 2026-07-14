import { Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";

const { TextArea } = Input;
const { Option } = Select;

export default function RoleForm({
    open,
    onCancel,
    onFinish,
    loading,
    role = null
}) {

    const [form] = Form.useForm();

    useEffect(() => {

        if (role) {
            form.setFieldsValue(role);
        } else {
            form.resetFields();
        }

    }, [role, form]);

    return (

        <Modal
            title={role ? "Edit Role" : "Add Role"}
            open={open}
            onCancel={onCancel}
            onOk={() => form.submit()}
            confirmLoading={loading}
            okText={role ? "Update" : "Save"}
            destroyOnHidden
            width={600}
        >

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >

                <Form.Item
                    name="roleCode"
                    label="Role Code"
                    rules={[
                        {
                            required: true,
                            message: "Role Code is required"
                        }
                    ]}
                >
                    <Input placeholder="ROLE001" />
                </Form.Item>

                <Form.Item
                    name="roleName"
                    label="Role Name"
                    rules={[
                        {
                            required: true,
                            message: "Role Name is required"
                        }
                    ]}
                >
                    <Input placeholder="Administrator" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                >
                    <TextArea rows={4} />
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