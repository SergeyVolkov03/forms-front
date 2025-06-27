import { useEffect, useState } from "react";
import { getTopicsFeth, updateTemplate } from "../../../api/api";
import { Select } from "antd";

export default function TemplateTopic({ data }) {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopicsFeth()
      .then((res) => {
        setTopics(
          res.data.map((element) => ({
            value: element.id,
            label: element.name,
          }))
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  function onChnageTopic(e) {
    updateTemplate(data.id, { topic_id: e }).catch((e) => {
      console.log(e);
    });
  }

  return (
    <>
      {topics.length && (
        <Select
          defaultValue={data.topic.name}
          options={topics}
          style={{ width: "100%", marginBottom: 5 }}
          onChange={onChnageTopic}
        />
      )}
    </>
  );
}
