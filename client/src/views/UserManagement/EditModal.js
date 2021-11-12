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
import UsersApi from "api/UsersApi";

const proxyApi = new UsersApi();

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
    if (editData) {
      updateProxy(editData, data);
    } else {
      addProxy(data);
    }
  };

  const updateProxy = async (editData, data) => {
    let res = await proxyApi.update(editData._id, data);
    if (res?.status) {
      message.success(res.message);
      handleOk();
    } else {
      message.error(res?.message || "Có lỗi xảy ra");
    }
  };

  const addProxy = async (data) => {
    let res = await proxyApi.add(data);
    if (res?.status) {
      message.success(res.message);
      handleOk();
    } else {
      message.error(res?.message || "Có lỗi xảy ra");
    }
  };

  useEffect(() => {
    if (isModalVisible) {
      setValue("proxy", editData?.proxy);
      setValue("description", editData?.description);
    }
  }, [isModalVisible]);

  console.log(errors);
  return (
    <>
      <Modal
        title={editData ? "Cập nhật thông tin người dùng" : "Thêm mới người dùng"}
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
                <label>Người dùng</label>
                <Form.Control
                  as={editData ? "input" : "textarea"}
                  placeholder={editData ? "" : "Nếu thêm nhiều người dùng cùng lúc, mỗi người dùng 1 dòng"}
                  {...register("người dùng", {
                    required: {
                      value: true,
                      message: "Không được để trống người dùng",
                    },
                  })}
                ></Form.Control>
                {errors?.proxy?.message && (
                  <Alert
                    className="mt-2"
                    message={errors?.proxy?.message}
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
