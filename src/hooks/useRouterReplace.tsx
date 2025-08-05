import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from './useRedux'
import type { QueryParamsInterface } from '@/models/common.model'
import { actionUpdateObjHistory } from '@/stores/features/routerHistory'

export function useRouter(defaultValue?: QueryParamsInterface) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [objHistory, setObjHistory] = useState<unknown>(defaultValue)

  function replaceState(newParams: QueryParamsInterface | QueryParamsInterface[]) {
    const searchParamsObj = new URLSearchParams(window?.location?.search)
    searchParamsObj.sort = () => {}

    const paramsToUpdate: QueryParamsInterface[] = Array.isArray(newParams)
      ? newParams
      : [newParams]

    paramsToUpdate?.forEach((params) => {
      Object.entries(params)?.forEach(([key, value]) => {
        const stringValue = value.toString()
        if (stringValue) {
          searchParamsObj.set(key, stringValue)
        } else {
          searchParamsObj.delete(key)
        }
      })
    })

    const filterQuery: { key: string; value: string }[] = []

    searchParamsObj?.forEach((value, key) => {
      filterQuery.push({ key, value })
    })

    dispatch(actionUpdateObjHistory(filterQuery))
    setObjHistory(filterQuery)
    window.history.replaceState({}, '', `?${searchParamsObj?.toString()}`)
  }

  return { navigate, replaceState, objHistory }
}
