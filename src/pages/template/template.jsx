import { useParams } from "react-router-dom";
import { Button, Divider, Flex, Spin, Tabs } from "antd";
import "./template.css";
import { useEffect, useState } from "react";
import { getTemplateByid, getUser } from "../../api/api";
import { LoadingOutlined } from "@ant-design/icons";
import Template from "../../components/template/template";
import { useAuth } from "../../provider/authProvider";

export default function TemplatePage() {
  const [templateData, setTemplateData] = useState();
  const { token, setAuthToken } = useAuth();
  const [isRead, setIsRead] = useState(false);
  const { id } = useParams();
  const [isFill, setIsFill] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getTemplateByid(+id)
      .then((res) => {
        if (!res.data) {
          setNotFound(true);
        } else {
          setTemplateData(res.data);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (token && templateData) {
      getUser(token)
        .then((res) => {
          if (
            templateData.author_id === res.data.id ||
            res.data.is_admin === true
          ) {
            setIsRead(false);
          } else {
            setIsRead(true);
          }
          if (templateData.fillers.some((el) => el.id === res.data.id)) {
            setIsFill(true);
          }
        })
        .catch((e) => {
          console.log(e);
          setAuthToken();
        });
    } else {
      setIsRead(true);
      setIsFill(false);
    }
  }, [templateData, token]);

  const items = [
    {
      key: "1",
      label: "Template",
      children: (
        <div>
          <Flex justify="center">
            <Flex vertical className="template-container">
              <Flex justify="center">
                <Button type="primary" disabled={!isFill}>
                  Fill in this form
                </Button>
              </Flex>
              <Divider />
              {templateData ? (
                <>
                  <Template data={templateData} disabled={isRead} />
                  <Divider />
                </>
              ) : (
                <Spin indicator={<LoadingOutlined spin />} size="large" />
              )}
            </Flex>
          </Flex>
        </div>
      ),
    },
    {
      key: "2",
      label: "Forms",
      children: "Content of Tab Pane 2",
    },
  ];

  return (
    <>
      {notFound ? (
        <div style={{ textAlign: "center" }}>Template not found</div>
      ) : (
        <Tabs defaultActiveKey="1" items={items} centered />
      )}
    </>
  );
}
