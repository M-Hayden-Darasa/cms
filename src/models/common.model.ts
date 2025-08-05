export interface QueryParamsInterface {
  [key: string]: string | number | boolean
}

export interface ObjectHistoryInterface {
  key: string
  value: string
}

export interface HistoryRouterInterface {
  objectHistory: ObjectHistoryInterface[]
}
