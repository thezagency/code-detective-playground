
const FinalCountdown = () => {
  const finalRoundDate = new Date(2025, 5, 5);
  const today = new Date();
  const daysUntilFinal = Math.ceil(
    (finalRoundDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  return (
    <div className="bg-blue-600 rounded-xl p-6 text-center text-white">
      <div className="text-3xl font-bold">{daysUntilFinal}</div>
      <div className="text-sm">Days until Finals</div>
    </div>
  );
};

export default FinalCountdown;
