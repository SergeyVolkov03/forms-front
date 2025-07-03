import { Flex, Table } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import "./template-form-table.css";
import { getFormsByTemplateId } from "../../../api/api";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) =>
      String(a.title.props.children).localeCompare(b.title.props.children),
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => String(a.name).localeCompare(b.name),
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => String(a.email).localeCompare(b.email),
  },
  {
    title: "Created at",
    dataIndex: "created_at",
    render: (date) => moment(date).fromNow(),
    sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
  },
];

export default function TemplateFormTable({ template_id }) {
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    getFormsByTemplateId(template_id).then((res) => {
      setData(res.data);
    });
  }, []);

  const dataSource = data.map((element) => ({
    key: element.id,
    title: <Link to={`/form/${element.id}`}>{element.template.title}</Link>,
    name: element.user.name,
    email: element.user.email,
    created_at: element.createdAt,
  }));

  return (
    <div className="form-table-container">
      <div>
        <Flex gap="middle" vertical>
          <Table columns={columns} dataSource={dataSource} />
        </Flex>
      </div>
    </div>
  );
}
