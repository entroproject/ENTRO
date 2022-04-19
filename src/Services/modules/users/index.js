import { api } from '../../api'
import signupUser from './signupUser'

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    fetchOne: signupUser(build),
  }),
  overrideExisting: false,
})

export const { useLazyFetchOneQuery } = userApi
