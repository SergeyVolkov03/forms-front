import { Button, Flex, notification, Table } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import "./form-table.css";
import { deleteManyForms, getFormsByUserId } from "../../api/api";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) =>
      String(a.title.props.children).localeCompare(b.title.props.children),
  },
  { title: "Description", dataIndex: "description" },
  {
    title: "Created at",
    dataIndex: "created_at",
    render: (date) => moment(date).fromNow(),
    sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
  },
];

export default function FormTable({ user_id }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [change, setChange] = useState(0);

  useEffect(() => {
    getFormsByUserId(user_id).then((res) => {
      setData(res.data);
    });
  }, [change]);

  function openNotificationSucces(text) {
    api.success({
      description: text,
    });
  }

  const dataSource = data.map((element) => ({
    key: element.id,
    title: <Link to={`/form/${element.id}`}>{element.template.title}</Link>,
    description: element.template.description,
    created_at: element.createdAt,
  }));

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  async function deleteForms() {
    deleteManyForms(selectedRowKeys)
      .then(() => {
        openNotificationSucces("Form(s) were deleted");
        setSelectedRowKeys([]);
        setChange((prev) => prev + 1);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="form-table-container">
      <div>
        {contextHolder}
        <Flex gap="middle" vertical>
          <Flex align="center" gap="middle" justify="center">
            <Button
              type="primary"
              disabled={!hasSelected}
              danger
              onClick={deleteForms}
            >
              Delete
            </Button>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
          </Flex>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
          />
        </Flex>
      </div>
    </div>
  );
}
