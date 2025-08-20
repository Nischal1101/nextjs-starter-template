function createKeys(tag: string) {
  return {
    list: () => [tag],
    bySlug: (id: string) => [tag, id],
    byFilter: (filters: Record<string, any>) => [tag, 'filter', filters],
  }
}

export const keys = {
  me: () => ['me'],
  sectors: createKeys('sectors')
} as const