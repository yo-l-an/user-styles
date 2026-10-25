export type Unit = 'B' | 'KB' | 'MB' | 'GB';

export interface Project {
  readonly id: string;
  name: string;
  size: number;
  tags?: string[];
  owner: { id: number; email: string };
}

export enum Status {
  Draft = 'draft',
  Published = 'published',
  Archived = 'archived',
}

const UNITS: readonly Unit[] = ['B', 'KB', 'MB', 'GB'];

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes <= 0) return '0 B';
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), UNITS.length - 1);
  return `${(bytes / 1024 ** index).toFixed(decimals)} ${UNITS[index]}`;
}

export function debounce<T extends (...args: any[]) => void>(fn: T, wait: number): T {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return ((...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  }) as T;
}

export abstract class Repository<TItem extends { id: string }> {
  protected items = new Map<string, TItem>();

  abstract fetchAll(): Promise<TItem[]>;

  public findById(id: string): TItem | undefined {
    return this.items.get(id);
  }
}

export const isPublished = (project: Project & { status: Status }): boolean =>
  project.status === Status.Published && project.size > 0;
