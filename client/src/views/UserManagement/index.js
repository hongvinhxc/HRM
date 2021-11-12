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
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";

// react-bootstrap components
import { Card, Container, Row, Col } from "react-bootstrap";
import EditModal from "./EditModal";
import UsersApi from "../../api/UsersApi";

const { confirm } = Modal;
const proxyApi = new UsersApi();

function ProxysManagement() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let res = await proxyApi.getAll();
    if (res?.status) {
      res.proxys.forEach((element) => {
        element.key = element._id;
      });
      setDataSource(res.proxys);
    } else {
      message.error(res?.message || "Có lỗi xảy ra.");
    }
  };

  const showModal = (data = null) => {
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
      width: 100,
      align: "center",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Người dùng",
      dataIndex: "proxy",
      width: 500,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
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

  const deleteProxy = async (proxy) => {
    let res = await proxyApi.delete(proxy._id);
    if (res?.status) {
      let data = dataSource.filter((element) => {
        return proxy._id != element._id;
      });
      setDataSource(data);
      message.success(res.message);
    } else {
      message.error(res?.message || "Có lỗi xảy ra.");
    }
  };

  const deleteManyProxy = async (proxys) => {
    let res = await proxyApi.deleteMany({proxys});
    if (res?.status) {
      getData();
      setSelectedRowKeys([]);
      message.success(res.message);
    } else {
      message.error(res?.message || "Có lỗi xảy ra.");
    }
  };

  const showDeleteConfirm = (proxy) => {
    confirm({
      title: `Bạn có chắc chắn muốn xoá proxy ${proxy.proxy}?`,
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
        deleteProxy(proxy);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const showDeleteAllConfirm = () => {
    confirm({
      title: `Bạn có chắc chắn muốn xoá tất cả proxy đã chọn không?`,
      icon: <ExclamationCircleOutlined />,
      okText: "Xoá tất cả",
      okType: "danger",
      cancelText: "Đóng",
      onOk() {
        console.log("OK");
        deleteManyProxy(selectedRowKeys);
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
                <Card.Title as="h4">Danh sách người dùng</Card.Title>
                  <Button
                    type="primary"
                    icon={<AndroidOutlined />}
                    onClick={() => showModal()}
                  >
                    Thêm người dùng
                  </Button>
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

export default ProxysManagement;
