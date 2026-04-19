export type ActionResult<T> = { data: T; error: null } | { data: null; error: string };

export type ActionReturnType<T> = Promise<{ success: boolean } & T>;
