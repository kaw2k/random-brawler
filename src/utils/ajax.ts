import fetch from 'isomorphic-unfetch'
import { stringifyUrl } from 'query-string'

export const ajax = {
  async post<Response = any, Body extends object = {}>(
    url: string,
    body?: Body
  ): Promise<Response> {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body || {}),
    })

    return await res.json()
  },

  async patch<Response = any, Body extends object = {}>(
    url: string,
    body?: Body
  ): Promise<Response> {
    const res = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(body || {}),
    })

    return await res.json()
  },

  async get<Response = any>(url: string, query: any = {}): Promise<Response> {
    const res = await fetch(stringifyUrl({ url, query }))
    return await res.json()
  },
}
