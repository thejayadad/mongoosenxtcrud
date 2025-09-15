export type ActionState<T = unknown> = {
  ok: boolean;
  data?: T;
  errors?: Record<string, string[]>;
  message?: string;
};

export const initialActionState: ActionState = { ok: false };
