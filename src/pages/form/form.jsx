import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getForm, getUser } from "../../api/api";
import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import FormHeader from "../../components/form/form-header/form-header";
import FormQuestions from "../../components/form/form-questions/form-questions";
import { useAuth } from "../../provider/authProvider";

export default function FormPage() {
  const { id } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const { token, setAuthToken } = useAuth();
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    getForm(+id)
      .then((res) => {
        if (!res.data) {
          navigate("/");
        }
        setData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (data) {
      getUser(token)
        .then((res) => {
          if (res.data.id === data.user_id || res.data.is_admin) {
            setIsRead(false);
          } else if (res.data.id === data.template.author_id) {
            setIsRead(true);
          } else navigate("/");
        })
        .catch(() => {
          setAuthToken();
        });
    }
  }, [data]);

  return (
    <>
      <Flex justify="center">
        <Flex style={{ width: 800 }}>
          {data ? (
            <Flex vertical style={{ width: "100%" }}>
              <FormHeader data={data.template} />
              <FormQuestions data={data} disabled={isRead} />
            </Flex>
          ) : (
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          )}
        </Flex>
      </Flex>
    </>
  );
}
