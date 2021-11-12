import React from "react";
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
import { getCurrentUser } from "utils";
import { Alert, message } from "antd";
import { changePassword } from "api/AuthenApi";

function User() {
  const username = getCurrentUser();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    defaultValues: {
      username,
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const onSubmit = async (data) => {
    const { username, password, newPassword, confirmNewPassword } = data;
    let res = await changePassword(
      username,
      password,
      newPassword,
      confirmNewPassword
    );
    if (res.success) {
      message.success(res.message);
    } else {
      message.error(res.message);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Đổi mật khẩu</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col className="pr-1" md={{ span: 10, offset: 1 }}>
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control
                          readOnly
                          type="text"
                          {...register("username")}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md={{ span: 10, offset: 1 }}>
                      <Form.Group>
                        <label>Password</label>
                        <Form.Control
                          type="password"
                          {...register("password", {
                            required: {
                              value: true,
                              message: "Không được để trống mật khẩu",
                            },
                            minLength: {
                              value: 8,
                              message: "Mật khẩu phải tối thiểu 8 ký tự",
                            },
                          })}
                        ></Form.Control>
                        {errors?.password?.message && (
                          <Alert
                            className="mt-2"
                            message={errors?.password?.message}
                            type="error"
                          />
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md={{ span: 10, offset: 1 }}>
                      <Form.Group>
                        <label>New password</label>
                        <Form.Control
                          type="password"
                          {...register("newPassword", {
                            required: {
                              value: true,
                              message: "Không được để trống mật khẩu mới",
                            },
                            minLength: {
                              value: 8,
                              message: "Mật khẩu mới phải tối thiểu 8 ký tự",
                            },
                          })}
                        ></Form.Control>
                        {errors?.newPassword?.message && (
                          <Alert
                            className="mt-2"
                            message={errors?.newPassword?.message}
                            type="error"
                          />
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md={{ span: 10, offset: 1 }}>
                      <Form.Group>
                        <label>Confirm new password</label>
                        <Form.Control
                          type="password"
                          {...register("confirmNewPassword", {
                            validate: (value) => {
                              if (value != watch("newPassword")) {
                                return "Mật khẩu xác nhận không khớp";
                              }
                            },
                          })}
                        ></Form.Control>
                      </Form.Group>
                      {errors?.confirmNewPassword?.message && (
                        <Alert
                          className="mt-2"
                          message={errors?.confirmNewPassword?.message}
                          type="error"
                        />
                      )}
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    variant="info"
                    type="submit"
                  >
                    Lưu
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={
                    require("assets/img/photo-1431578500526-4d9613015464.jpeg")
                      .default
                  }
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/face-1.jpg").default}
                    ></img>
                    <h5 className="title">Administrator</h5>
                  </a>
                  <p className="description">{`<3`}</p>
                </div>
                <p className="description text-center">
                  HRM <br></br>
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
