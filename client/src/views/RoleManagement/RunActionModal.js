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

const RunActionModal = ({
  isModalVisible,
  handleOk,
  handleCancel,
  actionData,
}) => {
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
    let body = {
      config: data,
      roles: actionData,
    };
    let res = await rolesApi.runAction(body);
    if (res?.status) {
      message.success(res.message);
      handleOk();
    } else {
      message.error(res?.message || "Có lỗi xảy ra");
    }
  };

  const getActionConfig = async () => {
    let res = await rolesApi.getActionConfig();
    if (res?.status) {
      setValue("viewAdsTimeFrom", res.config?.viewAdsTimeFrom);
      setValue("viewAdsTimeTo", res.config?.viewAdsTimeTo);
      setValue("like", res.config?.like);
      setValue("subscribe", res.config?.subscribe);
      setValue("repeat", res.config?.repeat);
      setValue("changeEmail", res.config?.changeEmail);
      setValue("changeProxy", res.config?.changeProxy);
    } else {
      message.error(res?.message || "Có lỗi xảy ra");
    }
  };

  useEffect(() => {
    if (isModalVisible) {
      getActionConfig();
    }
  }, [isModalVisible]);

  return (
    <>
      <Modal
        title="Chạy hành động"
        visible={isModalVisible}
        onOk={handleSubmit(onSubmit)}
        onCancel={handleCancel}
        cancelText="Đóng"
        okText="Chạy"
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col className="pr-1" md={{ span: 10, offset: 1 }}>
              <Form.Group>
                <label>Thời gian xem video</label>
                <div className="d-flex align-items-center">
                  Từ
                  <Form.Control
                    className="col-3 ml-1 mr-1"
                    type="number"
                    min="0"
                    {...register("viewAdsTimeFrom")}
                  ></Form.Control>
                  giây <span className="ml-5">Đến</span>
                  <Form.Control
                    className="col-3 ml-1 mr-1"
                    type="number"
                    min={watch("viewAdsTimeFrom")}
                    {...register("viewAdsTimeTo", {
                      validate: (value) => {
                        if (
                          parseInt(value) < parseInt(watch("viewAdsTimeFrom"))
                        ) {
                          return "Thời gian 'từ' phải nhỏ hơn hoặc bằng thời gian 'đến'";
                        }
                      },
                    })}
                  ></Form.Control>
                  giây
                </div>
                {errors?.viewAdsTimeTo?.message && (
                  <Alert
                    className="mt-2"
                    message={errors?.viewAdsTimeTo?.message}
                    type="error"
                  />
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="pr-1" md={{ span: 10, offset: 1 }}>
              <Form.Group>
                <Form.Switch
                  label="Like/Dislike video"
                  id="like"
                  {...register("like")}
                ></Form.Switch>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="pr-1" md={{ span: 10, offset: 1 }}>
              <Form.Group>
                <Form.Switch
                  label="Sub/Unsub kênh"
                  id="subscribe"
                  {...register("subscribe")}
                ></Form.Switch>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="pr-1" md={{ span: 10, offset: 1 }}>
              <Form.Group>
                <Form.Switch
                  label="Tự động đổi Email"
                  id="changeEmail"
                  {...register("changeEmail")}
                ></Form.Switch>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="pr-1" md={{ span: 10, offset: 1 }}>
              <Form.Group>
                <Form.Switch
                  label="Tự động đổi Proxy"
                  id="changeProxy"
                  {...register("changeProxy")}
                ></Form.Switch>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="pr-1" md={{ span: 10, offset: 1 }}>
              <Form.Group>
                <label>Lặp lại</label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    className="col-3 mr-1"
                    type="number"
                    min="0"
                    {...register("repeat")}
                  ></Form.Control>
                  lần
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default RunActionModal;
