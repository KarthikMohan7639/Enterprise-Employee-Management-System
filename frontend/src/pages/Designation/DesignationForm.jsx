import {
    Form,
    Input,
    Modal,
    Select
} from "antd";

import { useEffect, useState } from "react";

import DepartmentService from "../../services/DepartmentService";

const { Option } = Select;

export default function DesignationForm({

    open,
    onCancel,
    onFinish,
    loading,
    designation = null

}) {

    const [form] = Form.useForm();

    const [departments, setDepartments] = useState([]);

    useEffect(() => {

        async function loadDepartments() {

            try {

                const response =
                    await DepartmentService.getAllDepartments();

                setDepartments(response.data);

            } catch (error) {

                console.error(error);

            }

        }

        loadDepartments();

        if (designation) {

            form.setFieldsValue(designation);

        } else {

            form.resetFields();

        }

    }, [designation, form]);

    return (

        <Modal

            title={
                designation
                    ? "Edit Designation"
                    : "Add Designation"
            }

            open={open}

            onCancel={onCancel}

            onOk={() => form.submit()}

            confirmLoading={loading}

            okText={
                designation
                    ? "Update"
                    : "Save"
            }

            destroyOnHidden

            width={600}

        >

            <Form

                form={form}

                layout="vertical"

                onFinish={onFinish}

            >

                <Form.Item

                    label="Designation Code"

                    name="designationCode"

                    rules={[
                        {
                            required: true,
                            message: "Designation Code is required"
                        }
                    ]}

                >

                    <Input />

                </Form.Item>

                <Form.Item

                    label="Designation Name"

                    name="designationName"

                    rules={[
                        {
                            required: true,
                            message: "Designation Name is required"
                        }
                    ]}

                >

                    <Input />

                </Form.Item>

                <Form.Item

                    label="Department"

                    name="departmentId"

                    rules={[
                        {
                            required: true,
                            message: "Department is required"
                        }
                    ]}

                >

                    <Select
                        placeholder="Select Department"
                    >

                        {

                            departments.map(department => (

                                <Option

                                    key={department.id}

                                    value={department.id}

                                >

                                    {department.departmentName}

                                </Option>

                            ))

                        }

                    </Select>

                </Form.Item>

                <Form.Item

                    label="Description"

                    name="description"

                >

                    <Input.TextArea
                        rows={3}
                    />

                </Form.Item>

                <Form.Item

                    label="Status"

                    name="status"

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