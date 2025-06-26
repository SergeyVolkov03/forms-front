import { Button, Flex, notification, Table } from "antd";
import { useEffect, useState } from "react";
import {
  createTemplate,
  deleteTemplatesFetch,
  getTemplatesByUserId,
} from "../../api/api";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Link } from "react-router-dom";
import "./template-table.css";

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
    sorter: (a, b) => moment(a.created_at).unix() - moment(b.created_at).unix(),
  },
];

export default function TemplateTable({ user_id }) {
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [change, setChange] = useState(0);

  useEffect(() => {
    getTemplatesByUserId(user_id).then((res) => {
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
    title: <Link to={`/template/${element.id}`}>{element.title}</Link>,
    description: element.description,
    created_at: element.created_at,
  }));

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  async function createTemplateOnClick() {
    createTemplate({
      author_id: +user_id,
      title: "New Template",
      topic_id: 1,
    })
      .then((res) => {
        navigate(`/template/${res.data.id}`);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function deleteTemplates() {
    deleteTemplatesFetch(selectedRowKeys)
      .then(() => {
        openNotificationSucces("Template(s) were deleted");
        setSelectedRowKeys([]);
        setChange((prev) => prev + 1);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="template-table-container">
      <div className="template-table">
        {contextHolder}
        <Flex gap="middle" vertical>
          <Flex
            align="center"
            gap="middle"
            justify="center"
            style={{ paddingTop: 20 }}
          >
            <Button type="primary" onClick={createTemplateOnClick}>
              Create template
            </Button>
          </Flex>
          <Flex align="center" gap="middle" justify="center">
            <Button
              type="primary"
              disabled={!hasSelected}
              danger
              onClick={deleteTemplates}
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
