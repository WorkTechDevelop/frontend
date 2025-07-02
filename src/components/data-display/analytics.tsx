interface AnalyticsProps {
  data?: Record<string, unknown>;
}

export const Analytics = ({ }: AnalyticsProps) => {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">Аналитика</h3>
      <p className="text-gray-600">Раздел аналитики будет доступен позже</p>
    </div>
  );
};
