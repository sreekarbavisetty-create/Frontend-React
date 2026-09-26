/**
 * DetailRow Component (Functional Component)
 * Reusable row for label-and-value pairs (Client, Owner, Dates, Hours, Cost).
 */
function DetailRow({ label, value, isHighlighted = false }) {
  return (
    <div className={`detail-row ${isHighlighted ? 'highlighted' : ''}`}>
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  );
}

export default DetailRow;
