import React, { useEffect } from "react";
import { Alert, message, Modal } from "antd";
import { useForm } from "react-hook-form";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import RolesApi from "api/RolesApi";

const rolesApi = new RolesApi();

const EditModal = ({ isModalVisible, handleOk, handleCancel, editData }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
  });
  const onSubmit = async (data) => {
    updateRole(data);
  };

  const updateRole = async (data) => {
    let res = await rolesApi.update(editData._id, data);
    if (res?.status) {
      message.success(res.message);
      handleOk();
    } else {
      message.error(res?.message || "Có lỗi xảy ra");
    }
  };

  useEffect(() => {
    setValue("permission", editData.deviceKey);
    setValue("roleName", editData.deviceName);
    setValue("description", editData.description);
  }, [editData]);

  return (
    <>
      <Modal
        title="Cập nhật thông tin vai trò"
        visible={isModalVisible}
        onOk={handleSubmit(onSubmit)}
        onCancel={handleCancel}
        cancelText="Đóng"
        okText="Lưu"
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col className="pr-1" md={{ span: 10, offset: 1 }}>
              <Form.Group>
                <label>Tên vai trò</label>
                <Form.Control
                  type="text"
                  {...register("roleName", {
                    required: {
                      value: true,
                      message: "Không được để trống tên vai trò",
                    },
                  })}
                ></Form.Control>
                {errors?.roleName?.message && (
                  <Alert
                    className="mt-2"
                    message={errors?.roleName?.message}
                    type="error"
                  />
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="pr-1" md={{ span: 10, offset: 1 }}>
              <Form.Group>
                <label>Danh sách các quyền</label>
                <Form.Control
                  type="text"
                  {...register("permission", {
                    required: {
                      value: true,
                      message: "Không được để trống danh sách các quyền",
                    },
                  })}
                ></Form.Control>
                {errors?.permission?.message && (
                  <Alert
                    className="mt-2"
                    message={errors?.permission?.message}
                    type="error"
                  />
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="pr-1" md={{ span: 10, offset: 1 }}>
              <Form.Group>
                <label>Mô tả</label>
                <Form.Control
                  as="textarea"
                  {...register("description")}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default EditModal;
