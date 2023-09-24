export interface LoaderFunctionArgs {
  request: Request
  params: Record<string, string>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LoaderData<T extends (...args: any) => any> = Awaited<ReturnType<T>>

export interface ActionFunctionArgs {
  request: Request
  params: Record<string, string>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ActionData<T extends (...args: any) => any> = Awaited<ReturnType<T>>
