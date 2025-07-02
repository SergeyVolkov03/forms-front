import { Divider, Flex } from "antd";
import "./form-header.css";

export default function FormHeader({ data }) {
  return (
    <>
      <Flex vertical align="center" style={{ width: "100%", marginBottom: 50 }}>
        <Divider />
        {data.image && (
          <img src={data.image} alt="template-image" className="form-img" />
        )}
        <h2>{data.title}</h2>
        <h3>{data.description}</h3>
        <Divider />
      </Flex>
    </>
  );
}
