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
import CategoriesApi from "api/CategoriesApi";

const youtubeUrlApi = new CategoriesApi();

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
      updateYoutubeUrl(editData, data);
    } else {
      addYoutubeUrl(data);
    }
  };

  const updateYoutubeUrl = async (editData, data) => {
    let res = await youtubeUrlApi.update(editData._id, data);
    if (res?.status) {
      message.success(res.message);
      handleOk();
    } else {
      message.error(res?.message || "Có lỗi xảy ra");
    }
  };

  const addYoutubeUrl = async (data) => {
    let res = await youtubeUrlApi.add(data);
    if (res?.status) {
      message.success(res.message);
      handleOk();
    } else {
      message.error(res?.message || "Có lỗi xảy ra");
    }
  };

  useEffect(() => {
    if (isModalVisible) {
      setValue("url", editData?.url);
      setValue("description", editData?.description);
    }
  }, [isModalVisible]);

  console.log(errors);
  return (
    <>
      <Modal
        title={editData ? "Cập nhật thông tin danh mục" : "Thêm mới danh mục"}
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
                <label>Danh mục</label>
                <Form.Control
                  as={editData ? "input" : "textarea"}
                  placeholder={editData ? "" : "Nếu thêm nhiều link cùng lúc, mỗi link 1 dòng"}
                  {...register("url", {
                    required: {
                      value: true,
                      message: "Không được để trống danh mục",
                    },
                  })}
                ></Form.Control>
                {errors?.url?.message && (
                  <Alert
                    className="mt-2"
                    message={errors?.url?.message}
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
