import "./template-header.css";
import TemplateTitle from "./template-title/template-title";
import TemplateTags from "./template-tags/template-tags";
import TemplateDescription from "./template-description/template-description";
import TemplateTopic from "./template-topic/template-topic";
import { updateTemplate } from "../../api/api";
import TemplateUsers from "./template-users.jsx/template-users";
import { Button, Flex, Upload } from "antd";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

export default function TemplateHeader({ data }) {
  const [imageUrl, setImageUrl] = useState(data.image);

  async function handleUpload(e) {
    const { file } = e;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=a207f65b2da1b76a5d29a875e79d4592",
        {
          method: "POST",
          body: formData,
        }
      );
      const res = await response.json();
      const uploadedUrl = res.data.url;
      console.log(uploadedUrl);
      setImageUrl(uploadedUrl);
      updateTemplate(data.id, { image: uploadedUrl }).catch((e) => {
        console.log(e);
      });
    } catch (e) {
      console.log(e);
    }
  }

  async function removeImage() {
    setImageUrl("");
    updateTemplate(data.id, { image: "" })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      {imageUrl && (
        <img src={imageUrl} alt="template-image" className="template-img" />
      )}
      <TemplateTitle data={data} />
      <TemplateDescription data={data} />
      <TemplateTopic data={data} />
      <Flex style={{ marginBottom: 5 }}>
        {imageUrl ? (
          <Button onClick={removeImage}>Delete image</Button>
        ) : (
          <Upload
            customRequest={handleUpload}
            listType="picture"
            maxCount={1}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Upload image</Button>
          </Upload>
        )}
      </Flex>
      <TemplateTags data={data} />
      <TemplateUsers data={data} />
    </>
  );
}
