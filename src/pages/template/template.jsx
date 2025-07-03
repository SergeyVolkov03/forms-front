import { useNavigate, useParams } from "react-router-dom";
import { Button, Divider, Flex, Spin, Tabs } from "antd";
import "./template.css";
import { useEffect, useState } from "react";
import { createForm, getTemplateByid, getUser } from "../../api/api";
import { LoadingOutlined } from "@ant-design/icons";
import Template from "../../components/template/template";
import { useAuth } from "../../provider/authProvider";
import { jwtDecode } from "jwt-decode";
import TemplateFormTable from "../../components/template/template-form-table/template-form-table";

export default function TemplatePage() {
  const [templateData, setTemplateData] = useState();
  const { token, setAuthToken } = useAuth();
  const [isRead, setIsRead] = useState(false);
  const { id } = useParams();
  const [isFill, setIsFill] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

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
            setIsFill(true);
            setIsRead(false);
          } else {
            setIsRead(true);
          }
          if (
            templateData.fillers.some((el) => el.id === res.data.id) ||
            templateData.is_public
          ) {
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

  function fillInForm() {
    createForm({ template_id: +id, user_id: jwtDecode(token).userId })
      .then((res) => {
        navigate(`/form/${res.data.id}`);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const items = [
    {
      key: "1",
      label: "Template",
      children: (
        <div>
          <Flex justify="center">
            <Flex vertical className="template-container">
              <Flex justify="center">
                <Button type="primary" disabled={!isFill} onClick={fillInForm}>
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
      children: (
        <>
          {isRead ? (
            <Flex justify="center">You can`t see forms</Flex>
          ) : (
            <TemplateFormTable template_id={id} />
          )}
        </>
      ),
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
