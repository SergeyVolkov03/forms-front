import { Flex, Card, Spin } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPopularTmaplates } from "../../api/api";

export default function PopularTemplates() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPopularTmaplates(5)
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Flex vertical style={{ marginTop: 50, maxWidth: 1200 }}>
      <h2 className="home-title">Popular templates</h2>
      <div className="card-container">
        {loading ? (
          <Spin size="large" />
        ) : data.length > 0 ? (
          data.map((template) => (
            <Card className="card" hoverable>
              <Link to={`/template/${template.id}`} className="card-link">
                <Flex
                  vertical
                  style={{ height: "100%" }}
                  justify="space-between"
                >
                  <p className="card-item">{template.title}</p>
                  <p className="card-item">{template.description}</p>
                  <p className="card-item">
                    <span>author</span> {template.author.name}
                  </p>
                </Flex>
              </Link>
            </Card>
          ))
        ) : (
          <div>No templates</div>
        )}
      </div>
    </Flex>
  );
}
