type EntryWithUpdated = {
  id: string;
  data: {
    updated: Date;
  };
};

type EntryWithStatus = {
  data: {
    status: string;
  };
};

type EntryWithTopics = {
  data: {
    topics?: string[];
  };
};

export function byUpdatedDesc<T extends EntryWithUpdated>(a: T, b: T): number {
  return b.data.updated.getTime() - a.data.updated.getTime();
}

export function countByStatus<T extends EntryWithStatus>(entries: T[]): Record<string, number> {
  return entries.reduce<Record<string, number>>((counts, entry) => {
    counts[entry.data.status] = (counts[entry.data.status] ?? 0) + 1;
    return counts;
  }, {});
}

export function entriesForTopic<T extends EntryWithTopics>(entries: T[], topicSlug: string): T[] {
  return entries.filter((entry) => entry.data.topics?.includes(topicSlug));
}

export function relatedByIds<T extends { id: string }>(entries: T[], ids: string[] = []): T[] {
  const byId = new Map(entries.map((entry) => [entry.id, entry]));
  return ids.map((id) => byId.get(id)).filter((entry): entry is T => Boolean(entry));
}

export function displayDate(input: Date | string): string {
  const date = input instanceof Date ? input : new Date(input);
  const year = date.getUTCFullYear();
  const month = `${date.getUTCMonth() + 1}`.padStart(2, "0");
  const day = `${date.getUTCDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values)).sort();
}
