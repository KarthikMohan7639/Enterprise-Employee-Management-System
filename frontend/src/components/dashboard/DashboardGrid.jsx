import { Card, Statistic } from "antd";

export default function StatCard({
  title,
  value,
  icon,
  loading
}) {
  return (
    <Card loading={loading}>
      <Statistic
        title={title}
        value={value}
        prefix={icon}
      />
    </Card>
  );
}