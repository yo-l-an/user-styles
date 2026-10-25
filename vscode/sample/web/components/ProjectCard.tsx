import { useMemo, useState, type ReactNode } from 'react';
import { formatBytes, type Project } from '../scripts/utils/format';

type Props = {
  project: Project;
  actions?: ReactNode;
  onSelect?: (id: string) => void;
};

export function ProjectCard({ project, actions, onSelect }: Props) {
  const [expanded, setExpanded] = useState(false);
  const tags = useMemo(() => project.tags?.slice(0, 3) ?? [], [project.tags]);

  return (
    <article className={expanded ? 'card card--open' : 'card'} data-id={project.id}>
      <header onClick={() => setExpanded((open) => !open)}>
        <h2>{project.name}</h2>
        <span className="size">{formatBytes(project.size)}</span>
      </header>

      {expanded && (
        <ul className="tags">
          {tags.map((tag) => (
            <li key={tag}>#{tag}</li>
          ))}
        </ul>
      )}

      <footer>
        <button type="button" disabled={!onSelect} onClick={() => onSelect?.(project.id)}>
          Open
        </button>
        {actions}
      </footer>
    </article>
  );
}
