import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getForm } from "../../api/api";
import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import FormHeader from "../../components/form/form-header/form-header";
import FormQuestions from "../../components/form/form-questions/form-questions";

export default function FormPage() {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    getForm(+id)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <Flex justify="center">
        <Flex style={{ width: 800 }}>
          {data ? (
            <Flex vertical style={{ width: "100%" }}>
              <FormHeader data={data.template} />
              <FormQuestions data={data} />
            </Flex>
          ) : (
            <Spin indicator={<LoadingOutlined spin />} size="large" />
          )}
        </Flex>
      </Flex>
    </>
  );
}
