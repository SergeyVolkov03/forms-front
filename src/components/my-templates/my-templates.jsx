import { Tabs } from "antd";
import TemplateTable from "../template-table/template-table";

export default function MyTemplates({ user_id }) {
  const items = [
    {
      key: "1",
      label: "My templates",
      children: <TemplateTable user_id={user_id} />,
    },
    {
      key: "2",
      label: "My forms",
      children: "Content of Tab Pane 2",
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} centered />;
}
