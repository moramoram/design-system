import { atom, selector } from "recoil";
import { axiosInstance, localStorageEffect } from "@/utils";

export const token = atom({
  key: "token",
  default: {
    accessToken: undefined,
    refreshToken: undefined,
  },
  effects_UNSTABLE: [localStorageEffect("ssafe_token")],
});

export const auth = selector({
  key: "auth",
  get: async ({ get }) => {
    console.log(!!get(token).accessToken, get(token).accessToken);
    if (!!get(token).accessToken) {
      const res = await axiosInstance({ url: "users/me" });
      return res.data;
    }
    return {};
  },
});

export const isLoginState = selector({
  key: "isLoginState",
  get: ({ get }) => {
    return !!get(token).accessToken;
  },
});

export const isAuthenticated = selector({
  key: "isAuthenticated",
  get: ({ get }) => {
    return !!(get(auth)?.authCheck === 3);
  },
});

export const authState = selector({
  key: "authState",
  get: ({ get }) => {
    return get(auth)?.authCheck;
  },
});

export const accessToken = selector({
  key: "accessToken",
  get: ({ get }) => {
    return get(token).accessToken;
  },
});

export const refreshToken = selector({
  key: "refreshToken",
  get: ({ get }) => {
    return get(token).refreshToken;
  },
});
