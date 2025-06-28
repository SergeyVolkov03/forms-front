import { useState, useEffect } from "react";
import { Select, Spin, Tag } from "antd";
import { getUserByQuery } from "../../../api/api";

const { Option } = Select;

export default function TemplateUsers({ value = [], onChange }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setLoading(true);
    async function fetchUsers() {
      getUserByQuery(searchText)
        .then((res) => {
          console.log(res.data);
          setOptions(res.data);
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setLoading(false);
        });
    }

    const timer = setTimeout(() => {
      if (searchText) {
        fetchUsers();
      } else {
        setOptions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  function handleSearch(value) {
    setSearchText(value);
  }

  // Обработчик выбора пользователя
  function handleSelect(userId, option) {
    const selectedUser = options.find((user) => user.id === userId);
    if (selectedUser && !value.some((user) => user.id === userId)) {
      const newValue = [...value, selectedUser];
      onChange(newValue);
    }
    setSearchText("");
  }

  // Обработчик удаления пользователя
  const handleRemove = (userId) => {
    const newValue = value.filter((user) => user.id !== userId);
    onChange(newValue);
  };

  // Кастомный рендер тега
  const tagRender = (props) => {
    const { label, closable, onClose } = props;
    return (
      <Tag
        color="blue"
        closable={closable}
        onClose={onClose}
        style={{ margin: "4px" }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <Select
      mode="multiple"
      showSearch
      value={value.map((user) => ({
        key: user.id,
        label: `${user.name} (${user.email})`,
        value: user.id,
      }))}
      placeholder="Начните вводить имя пользователя..."
      filterOption={false}
      onSearch={handleSearch}
      onSelect={handleSelect}
      onDeselect={handleRemove}
      notFoundContent={
        loading ? <Spin size="small" /> : "Пользователь не найден"
      }
      style={{ width: "100%" }}
      tagRender={tagRender}
      searchValue={searchText}
      labelInValue={true}
    >
      {options.map((user) => (
        <Option key={user.id} value={user.id}>
          {user.name} ({user.email})
        </Option>
      ))}
    </Select>
  );
}
