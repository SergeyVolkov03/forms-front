import { useEffect, useState } from "react";
import { Button, Flex, Table, Space, notification } from "antd";
import "./admin-table.css";
import { useAuth } from "../../provider/authProvider";
import moment from "moment";
import {
  deleteUsersFetch,
  getUser,
  getUsers,
  updateUsers,
} from "../../api/api";
import { useNavigate } from "react-router-dom";

const columns = [
  { title: "Name", dataIndex: "name" },
  { title: "Email", dataIndex: "email" },
  { title: "Block status", dataIndex: "blockStatus" },
  { title: "Status", dataIndex: "status" },
  { title: "Last Seen", dataIndex: "lastSeen" },
];

export default function AdminTable() {
  const { token, setAuthToken } = useAuth();
  const [data, setData] = useState([]);
  const [user, setUser] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [change, setChange] = useState(0);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  function openNotificationSucces(text) {
    api.success({
      description: text,
    });
  }

  useEffect(() => {
    getUser(token)
      .then((res) => {
        if (res.data.is_admin) {
          setUser(res.data);
          getUsers(token).then((res) => {
            setData(res.data);
          });
        } else {
          navigate("/");
        }
      })
      .catch(() => {
        setAuthToken();
      });
  }, [change]);

  async function updateUsersStatus(data, message) {
    return updateUsers(token, selectedRowKeys, data).then(() => {
      openNotificationSucces(message);
      setSelectedRowKeys([]);
      setTimeout(() => {
        setChange((e) => e + 1);
      }, 1000);
    });
  }

  async function updateStatusByBlocked() {
    updateUsersStatus({ is_blocked: true }, "User(s) were blocked");
  }

  async function updateStatusByUnBlocked() {
    updateUsersStatus({ is_blocked: false }, "User(s) were unblocked");
  }

  async function updateStatusAddAdmin() {
    updateUsersStatus(
      { is_admin: true },
      "Add status Admin for selected users"
    );
  }

  async function updateStatusRemoveAdmin() {
    updateUsersStatus(
      { is_admin: false },
      "Remove status Admin for selected users"
    );
  }

  async function deleteUsers() {
    deleteUsersFetch(token, selectedRowKeys).then(() => {
      openNotificationSucces("User(s) were deleted");
      setSelectedRowKeys([]);
      setTimeout(() => {
        setChange((e) => e + 1);
      }, 1000);
    });
  }

  const dataSourceSorted = data.sort(
    (a, b) =>
      new Date(b.last_time_at).getTime() - new Date(a.last_time_at).getTime()
  );

  const dataSource = dataSourceSorted.map((element) => ({
    key: element.id,
    name: user.id === element.id ? element.name + " (it's you)" : element.name,
    email: element.email,
    blockStatus: element.is_blocked ? "blocked" : "active",
    status: element.is_admin ? "admin" : "user",
    lastSeen: moment(element.last_time_at).fromNow(),
  }));

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div className="main">
      <p className="main-description">
        Here you can block, unblock, change admin status and delete user(s)
        (yourself too).
      </p>
      <Flex gap="middle" vertical>
        {contextHolder}
        <Flex
          align="center"
          gap="middle"
          justify="center"
          style={{ paddingTop: 20, paddingBottom: 20 }}
        >
          <Space>
            <div className="toolbar">
              <div className="table-buttons">
                <Button
                  type="primary"
                  ghost
                  disabled={!hasSelected}
                  onClick={updateStatusByBlocked}
                >
                  block
                </Button>
                <Button
                  type="primary"
                  ghost
                  disabled={!hasSelected}
                  onClick={updateStatusByUnBlocked}
                >
                  unblock
                </Button>
                <Button
                  type="primary"
                  ghost
                  disabled={!hasSelected}
                  onClick={updateStatusAddAdmin}
                >
                  toAdmin
                </Button>
                <Button
                  type="primary"
                  ghost
                  disabled={!hasSelected}
                  onClick={updateStatusRemoveAdmin}
                >
                  fromAdmin
                </Button>
                <Button
                  type="primary"
                  danger
                  ghost
                  disabled={!hasSelected}
                  onClick={deleteUsers}
                >
                  delete
                </Button>
              </div>
            </div>
          </Space>

          {hasSelected ? `Selected ${selectedRowKeys.length} user(s)` : null}
        </Flex>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
        />
      </Flex>
    </div>
  );
}
