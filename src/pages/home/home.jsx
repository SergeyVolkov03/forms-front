import { Flex } from "antd";
import "./home.css";
import LatestTemplates from "../../components/latest-templates/latest-tamplates";
import PopularTemplates from "../../components/popular-templates/popular-templates";

export default function HomePage() {
  return (
    <Flex align="center" style={{ marginTop: 50 }} vertical>
      <LatestTemplates />
      <PopularTemplates />
    </Flex>
  );
}
