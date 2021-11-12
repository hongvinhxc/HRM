import {
  Table,
  Switch,
  Radio,
  Form,
  Space,
  Button,
  Modal,
  message,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  AndroidOutlined,
  StopOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";

// react-bootstrap components
import { Card, Container, Row, Col } from "react-bootstrap";
import EditModal from "./EditModal";
import RolesApi from "../../api/RolesApi";
import RunActionModal from "./RunActionModal";

const { confirm } = Modal;
const rolesApi = new RolesApi();

function RolesManagement() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isActionModalVisible, setIsActionModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let res = await rolesApi.getAll();
    if (res?.status) {
      res.roles.forEach((element) => {
        element.key = element.deviceKey;
      });
      setDataSource(res.roles);
    } else {
      message.error(res?.message || "Có lỗi xảy ra.");
    }
  };

  const showModal = (data) => {
    setEditData(data);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    getData();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "STT",
      key: "_id",
      width: 50,
      align: "center",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Vai trò",
      dataIndex: "deviceName",
      width: 200,
    },
    {
      title: "Quyền",
      dataIndex: "deviceKey",
      width: 200,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: 300,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      align: "right",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          >
            Sửa
          </Button>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(record)}
          >
            Xoá
          </Button>
        </Space>
      ),
    },
  ];

  const deleteRole = async (device) => {
    let res = await rolesApi.delete(device._id);
    if (res?.status) {
      let data = dataSource.filter((element) => {
        return device._id != element._id;
      });
      setDataSource(data);
      message.success(res.message);
    } else {
      message.error(res?.message || "Có lỗi xảy ra.");
    }
  };

  const showDeleteConfirm = (device) => {
    confirm({
      title: `Bạn có chắc chắn muốn xoá thiết bị ${device.deviceName}?`,
      icon: <ExclamationCircleOutlined />,
      okText: "Xoá",
      okType: "danger",
      cancelText: "Đóng",
      onOk() {
        console.log("OK");
        deleteRole(device);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover p-3 mb-0">
              <Card.Header className="d-flex justify-content-between">
                <Card.Title as="h4">Danh sách thiết bị</Card.Title>
                <div>
                <Button
                  type="primary"
                  icon={<AndroidOutlined />}
                  onClick={showModal}
                >
                  Thêm vai trò
                </Button>
                </div>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table
                  rowSelection={{
                    onChange: (selectedRowKeys, selectedRows) => {
                      setSelectedRowKeys(selectedRowKeys);
                    },
                  }}
                  columns={columns}
                  dataSource={dataSource}
                  pagination={false}
                  scroll={{
                    y: "calc(100vh - 362px)",
                    x: "auto",
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <EditModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        editData={editData}
      />
    </>
  );
}

export default RolesManagement;
