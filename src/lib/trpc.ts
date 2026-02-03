// Stub do tRPC - retorna dados mockados enquanto não há backend
// TODO: Conectar ao backend real quando estiver disponível

type UseQueryResult<T> = {
  data: T;
  isLoading: boolean;
  error: null;
  refetch: () => void;
};

type UseMutationResult<T> = {
  mutate: (data: unknown) => void;
  mutateAsync: (data: unknown) => Promise<T>;
  isLoading: boolean;
  error: null;
};

// Mock de conversas
const mockConversas: unknown[] = [];

// Mock de analytics
const mockAnalytics = {
  totalConversas: 0,
  taxaConversao: 0,
  conversasPositivas: 0,
  conversasNegativas: 0,
};

// Criar hook mockado de query
function createMockQuery<T>(data: T): (options?: unknown) => UseQueryResult<T> {
  return () => ({
    data,
    isLoading: false,
    error: null,
    refetch: () => {},
  });
}

// Criar hook mockado de mutation
function createMockMutation<T>(): () => UseMutationResult<T> {
  return () => ({
    mutate: () => {},
    mutateAsync: async () => ({} as T),
    isLoading: false,
    error: null,
  });
}

// Cliente tRPC mockado
export const trpc = {
  conversas: {
    list: {
      useQuery: createMockQuery(mockConversas),
    },
    create: {
      useMutation: createMockMutation(),
    },
    update: {
      useMutation: createMockMutation(),
    },
    delete: {
      useMutation: createMockMutation(),
    },
  },
  analytics: {
    get: {
      useQuery: createMockQuery(mockAnalytics),
    },
  },
  headhunter: {
    search: {
      useMutation: createMockMutation(),
    },
    analyze: {
      useMutation: createMockMutation(),
    },
  },
  bibliotecaMkt: {
    list: {
      useQuery: createMockQuery([]),
    },
    create: {
      useMutation: createMockMutation(),
    },
    generate: {
      useMutation: createMockMutation(),
    },
  },
  clienteSintetico: {
    chat: {
      useMutation: createMockMutation(),
    },
    save: {
      useMutation: createMockMutation(),
    },
  },
};
