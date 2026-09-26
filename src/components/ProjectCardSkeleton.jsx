/**
 * ProjectCardSkeleton Component (Slide 8 & 11)
 * Reserves the exact visual space of ProjectCard so nothing jumps when data lands.
 */
function ProjectCardSkeleton() {
  return (
    <div className="project-card skeleton-card" aria-busy="true" aria-label="Loading project details">
      {/* Header Skeleton */}
      <div className="card-header">
        <div className="skeleton-bar skeleton-title" />
        <div className="skeleton-bar skeleton-badge" />
      </div>

      {/* Body Skeleton (5 rows matching DetailRow) */}
      <div className="card-body">
        <div className="skeleton-detail-row">
          <div className="skeleton-bar skeleton-label" />
          <div className="skeleton-bar skeleton-value" />
        </div>
        <div className="skeleton-detail-row">
          <div className="skeleton-bar skeleton-label" />
          <div className="skeleton-bar skeleton-value" />
        </div>
        <div className="skeleton-detail-row">
          <div className="skeleton-bar skeleton-label" />
          <div className="skeleton-bar skeleton-value" />
        </div>
        <div className="skeleton-detail-row">
          <div className="skeleton-bar skeleton-label" />
          <div className="skeleton-bar skeleton-value" />
        </div>
        <div className="skeleton-detail-row skeleton-highlighted">
          <div className="skeleton-bar skeleton-label" />
          <div className="skeleton-bar skeleton-value-cost" />
        </div>
      </div>
    </div>
  );
}

export default ProjectCardSkeleton;
