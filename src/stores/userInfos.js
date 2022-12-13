import { defineStore } from 'pinia'

export const useUserInfosStore = defineStore({
  id: 'userInfos',
  state: () => {
    return {
      userName: "",
      access_token: "",
      refresh_token: "",
      userLocation:"",
      userId: "",
      defaultCreatureID:""
    }
  },
  persist: true
})
