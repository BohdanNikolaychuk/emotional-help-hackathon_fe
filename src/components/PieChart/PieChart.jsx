import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#964B00'];
const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div
        className="custom-tooltip"
        style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
        <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
      </div>
    );
  }

  return null;
};

export default function Chart(pieChart) {
  const answer = pieChart.pieChart;
  console.log(answer);
  return (
    <PieChart width={730} height={300} style={{ zIndex: '1000' }}>
      <Pie
        data={answer}
        color="#000000"
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={120}
        fill="#8884d8">
        {answer.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend />
    </PieChart>
  );
}
