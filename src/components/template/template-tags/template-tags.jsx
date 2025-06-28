import { useState, useEffect } from "react";
import { AutoComplete, Tag, Button } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import {
  createTag,
  getAllTags,
  getAllTagsByQuery,
  updateTemplate,
} from "../../../api/api";

export default function TemplateTags({ data }) {
  const [tags, setTags] = useState(data.tags);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllTags().then((res) => {
      setOptions(res.data);
    });
  }, [tags]);

  useEffect(() => {
    async function fetchTagsQuery() {
      getAllTagsByQuery(inputValue)
        .then((res) => {
          console.log(res.data);
          setOptions(res.data.map((tag) => ({ value: tag.name })));
        })
        .catch((e) => {
          console.log(e);
        });
    }
    let timer;
    if (inputValue) {
      timer = setTimeout(() => {
        fetchTagsQuery();
      }, 300);
    } else {
      setOptions([]);
    }

    return () => clearTimeout(timer);
  }, [inputValue]);

  const addTag = async () => {
    if (!inputValue.trim()) return;

    const tagName = inputValue.trim();
    setLoading(true);

    try {
      if (tags.some((t) => t.name.toLowerCase() === tagName.toLowerCase())) {
        return;
      }

      const tag = (await createTag({ name: tagName })).data;

      updateTemplate(data.id, {
        tags: [...tags.map((t) => t.id), tag.id],
      }).catch((e) => {
        console.log(e);
      });

      setTags([...tags, tag]);
      setInputValue("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  async function removeTag(tagId) {
    const filteredTags = tags.filter((tag) => tag.id !== tagId);
    updateTemplate(data.id, { tags: [...filteredTags.map((t) => t.id)] })
      .then(() => {
        setTags(filteredTags);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function onChnageInput(value) {
    setInputValue(value);
  }

  return (
    <div className="tag-editor" style={{ marginBottom: 5 }}>
      <div className="tags-container" style={{ marginBottom: 5 }}>
        {tags.map((tag) => (
          <Tag
            color="geekblue"
            key={tag.id}
            closable
            onClose={() => removeTag(tag.id)}
            closeIcon={<CloseOutlined />}
          >
            {tag.name}
          </Tag>
        ))}
      </div>

      {options && (
        <div
          className="tag-input-container"
          style={{ display: "flex", gap: 8 }}
        >
          <AutoComplete
            style={{ width: "100%" }}
            options={inputValue.trim() === "" ? [] : options}
            placeholder="Enter tag"
            value={inputValue}
            onChange={onChnageInput}
            onSelect={(value) => {
              setInputValue(value);
            }}
          />
          <Button icon={<PlusOutlined />} onClick={addTag} loading={loading}>
            Add tag
          </Button>
        </div>
      )}
    </div>
  );
}
