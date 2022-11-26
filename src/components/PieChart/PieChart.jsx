import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#964B00'];

const pieData = [
  {
    name: 'Sundness',
    value: 7.91,
  },
  {
    name: 'Happy',
    value: 6.85,
  },
  {
    name: 'Angry',
    value: 6.14,
  },
  {
    name: 'Joy',
    value: 10.25,
  },
  {
    name: 'Fear',
    value: 4.5,
  },
  {
    name: 'Surprise',
    value: 4.5,
  },
];

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

export default function Chart() {
  return (
    <PieChart width={730} height={300}>
      <Pie
        data={pieData}
        color="#000000"
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={120}
        fill="#8884d8">
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend />
    </PieChart>
  );
}
