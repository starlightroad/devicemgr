export type ActionResult<T> = { data: T; error: null } | { data: null; error: string };

export type ActionReturnType<T extends object> = Promise<{ success: boolean; serverErrors: T | null }>;
