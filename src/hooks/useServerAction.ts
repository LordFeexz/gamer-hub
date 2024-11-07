import { DEFAULT_RESPONSE } from "@/constants/response";
import type { DefaultResponse } from "@/interfaces";
import { useActionState } from "react";

export type ActionFunction<T> = (
  props: DefaultResponse<T>,
  formData: FormData
) => Promise<DefaultResponse<T>>;

export default function useServerAction<T>(action: ActionFunction<T>) {
  const [state, enhanceAction] = useActionState(action, DEFAULT_RESPONSE);

  return [state, enhanceAction] as const;
}
