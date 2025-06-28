import { useState, useEffect } from "react";
import { Select, Spin, Tag } from "antd";
import { getUserByQuery, updateTemplate } from "../../../api/api";

const { Option } = Select;

export default function TemplateUsers({ data }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState(data.fillers);

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

    let timer;
    if (searchText) {
      timer = setTimeout(() => {
        fetchUsers();
      }, 300);
    } else {
      setOptions([]);
    }

    return () => clearTimeout(timer);
  }, [searchText]);

  function handleSearch(value) {
    setSearchText(value);
  }

  function handleSelect(select) {
    console.log(+select.key, "select");
    const selectedUser = options.find((user) => user.id === +select.key);
    if (selectedUser && !users.some((user) => user.id === +select.key)) {
      updateTemplate(data.id, {
        fillers: [...users.map((e) => e.id), selectedUser.id],
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
      setUsers([...users, selectedUser]);
    }
    setSearchText("");
  }

  function handleRemove(e) {
    const newUsers = users.filter((user) => user.id !== e.key);
    updateTemplate(data.id, {
      fillers: [...newUsers.map((e) => e.id)],
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    setUsers(newUsers);
  }

  const tagRender = (props) => {
    const { label, closable, onClose } = props;
    return (
      <Tag
        color="geekblue"
        closable={closable}
        onClose={onClose}
        style={{ margin: "4px" }}
      >
        {label}
      </Tag>
    );
  };

  const selectValue =
    users.length > 0
      ? users.map((user) => ({
          key: user.id,
          label: `${user.name} (${user.email})`,
          value: user.id,
        }))
      : undefined;

  return (
    <Select
      mode="multiple"
      showSearch
      value={selectValue}
      placeholder="Start typing your username..."
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
        <Option key={user.id} value={`${user.name} (${user.email})`}>
          {`${user.name} (${user.email})`}
        </Option>
      ))}
    </Select>
  );
}
