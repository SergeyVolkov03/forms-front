import { useParams } from "react-router-dom";
import TemplateHeader from "../../components/template/template-header";
import { Divider, Flex, Spin } from "antd";
import "./template.css";
import { useEffect, useState } from "react";
import { getTemplateByid, getUser } from "../../api/api";
import { LoadingOutlined } from "@ant-design/icons";
// import { useAuth } from "../../provider/authProvider";
// import { useState } from "react";

export default function TemplatePage() {
  const [templateData, setTemplateData] = useState();
  // const { token, setAuthToken } = useAuth();
  // const [isRead, setIsRead] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getTemplateByid(+id).then((res) => {
      console.log(res.data);
      setTemplateData(res.data);
    });
  }, []);

  return (
    <div>
      <Flex justify="center">
        <Flex vertical className="template-container">
          <Divider />
          {templateData ? (
            <TemplateHeader data={templateData} />
          ) : (
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          )}
        </Flex>
      </Flex>
    </div>
  );
}
