import { defineStore } from 'pinia'

export const useUserInfosStore = defineStore({
  id: 'userInfos',
  state: () => ({
    access_token: "",
    refresh_token: ""
  }),
  persist: true
})
