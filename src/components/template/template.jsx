import "./template.css";
import TemplateTitle from "./template-title/template-title";
import TemplateTags from "./template-tags/template-tags";
import TemplateDescription from "./template-description/template-description";
import TemplateTopic from "./template-topic/template-topic";
import { updateTemplate } from "../../api/api";
import TemplateUsers from "./template-users.jsx/template-users";
import { Button, Divider, Flex, Upload } from "antd";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import TemplateQuestions from "./template-questions/template-question";

export default function Template({ data, disabled }) {
  const [imageUrl, setImageUrl] = useState(data.image);
  const [position, setPosition] = useState(1);

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

  function handleHeaderAction() {
    setPosition(1);
  }

  return (
    <>
      <div onClick={handleHeaderAction}>
        {imageUrl && (
          <img src={imageUrl} alt="template-image" className="template-img" />
        )}
        <TemplateTitle data={data} disabled={disabled} />
        <TemplateDescription data={data} disabled={disabled} />
        <TemplateTopic data={data} disabled={disabled} />
        <Flex style={{ marginBottom: 5 }}>
          {imageUrl ? (
            <Button onClick={removeImage} disabled={disabled}>
              Delete image
            </Button>
          ) : (
            <Upload
              disabled={disabled}
              customRequest={handleUpload}
              listType="picture"
              maxCount={1}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />} disabled={disabled}>
                Upload image
              </Button>
            </Upload>
          )}
        </Flex>
        <TemplateTags data={data} disabled={disabled} />
        <TemplateUsers data={data} disabled={disabled} />
      </div>
      <Divider />
      <TemplateQuestions
        disabled={disabled}
        data={data}
        position={position}
        setPosition={setPosition}
      />
    </>
  );
}
