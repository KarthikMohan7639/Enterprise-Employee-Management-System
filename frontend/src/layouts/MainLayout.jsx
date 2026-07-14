import { Layout } from "antd";
import Sidebar from "../components/layout/Sidebar/Sidebar";
import HeaderComponent from "../components/layout/Header/Header";
import FooterComponent from "../components/layout/Footer/Footer";

const { Content } = Layout;

export default function MainLayout({ children }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />

      <Layout>
        <HeaderComponent />

        <Content
          style={{
            padding: 20,
            background: "#f5f7fa"
          }}
        >
          {children}
        </Content>

        <FooterComponent />
      </Layout>
    </Layout>
  );
}