import { useEffect, useState } from "react";
import { FileUploaderMinimal } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import "./template-header.css";
import TemplateTitle from "./template-title/template-title";
import TemplateTags from "./template-tags/template-tags";
import TemplateDescription from "./template-description/template-description";
import TemplateTopic from "./template-topic/template-topic";
import { updateTemplate } from "../../api/api";

export default function TemplateHeader({ data }) {
  const [img, setImg] = useState(data.image);

  useEffect(() => {
    updateTemplate(data.id, { image: img });
  }, [img]);

  const handleChangeEvent = (e) => {
    if (e.allEntries[0]) {
      setImg(e.allEntries[0].cdnUrl);
    } else setImg(null);
  };

  return (
    <>
      {img && <img src={img} alt="template-image" className="template-img" />}
      <TemplateTitle data={data} />
      <TemplateDescription data={data} />
      <TemplateTopic data={data} />
      <TemplateTags data={data} />
      <FileUploaderMinimal
        useCloudImageEditor={false}
        sourceList="local"
        classNameUploader="uc-light"
        pubkey="661e1b8f30a9ee1a5ed2"
        onChange={handleChangeEvent}
      />
    </>
  );
}
