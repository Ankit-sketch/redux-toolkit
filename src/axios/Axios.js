import axios from "axios";
import { toasts } from "../Components/UI/Toast/Toast";
import { storeInstance } from "..";
import { setLoader } from "../redux/reducers/loader";
import { decryption, encryption } from "../utils/Util";
const IS_ENCRYPTION = false;
const BASE_URL = process.env.REACT_APP_API_HOST;
export const axiosApi = axios.create({
  baseURL: BASE_URL,
});
// request interceptor
axiosApi.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    storeInstance.dispatch(setLoader(true));
    return config;
  },
  (error) => {
    storeInstance.dispatch(setLoader(false));
    return error;
  }
);

// response interceptor
axiosApi.interceptors.response.use(
  (response) => {
    storeInstance.dispatch(setLoader(false));
    return response;
  },
  (error) => {
    storeInstance.dispatch(setLoader(false));
    throw error;
  }
);
function formatUrl(url, params) {
  params =
    params && Object.keys(params).length > 0
      ? `?${new URLSearchParams(params).toString()}`
      : "";
  return `${url}${params}`;
}

function handleError(error) {
  if (
    error?.response?.status &&
    (error?.response?.status === 403 || error?.response?.status === 401)
  ) {
    toasts.error("Please re-login, last login session expired.");
    localStorage.clear();
  } else {
    error?.data?.message && toasts.error(error.data.message);
    error?.response?.data?.message && toasts.error(error.response.data.message);
  }
}

function handleSuccess(res) {
  if (res.status === 200 || res.status === 201) {
    res.message && toasts.success(res.message);
    res?.data?.message && toasts.success(res.data.message);
  }
  if (res.status === 403 || res.status === 400) {
    res.message && toasts.warning(res.message);
  }
}

export const apiCallGet = async (
  url,
  header,
  params = {},
  toastOn,
  noSuccessToast = false
) => {
  const resp = await axiosApi
    .get(formatUrl(url, params), {})
    .then(async (res) => {
      console.log("----RES--1-", res?.data);
      let decryptData = decryptionFilter(res?.data);
      console.log("----RES--2-", decryptData);
      if (toastOn === true) {
        handleSuccess(decryptData);
      }
      return decryptData;
    })
    .catch((error) => {
      console.log("----RES--11-", error);
      let decryptData = decryptionFilter(error?.response?.data);
      console.log("--decryptData---", decryptData);
      if (error?.response?.status && error?.response?.status === 401) {
        toasts.error("Please re-login, last login session expired.");
        localStorage.clear();
      }
      if (
        (decryptData && decryptData?.message) ||
        decryptData?.message === "Network Error"
      ) {
        toasts.error(decryptData?.message);
      }
      return decryptData;
    });
  console.log("----TAGGGG---", resp);
  return resp;
};

export const apiCallPost = async (
  url,
  data,
  params = {},
  toastOn,
  noSuccessToast = false
) => {
  console.log("----DATATATATA--", data);
  let dataFiltered = await encryptionFilter(data);
  const resp = await axiosApi
    .post(formatUrl(url, params), dataFiltered)
    .then(async (res) => {
      console.log("----RES--1-", res?.data);
      let decryptData = decryptionFilter(res?.data);
      console.log("----RES--2-", decryptData);
      if (toastOn === true) {
        handleSuccess(decryptData);
      }
      return decryptData;
    })
    .catch((error) => {
      console.log("----RES--11-", error);
      let decryptData = decryptionFilter(error?.response?.data);
      console.log("--decryptData---", decryptData);
      if (error?.response?.status && error?.response?.status === 401) {
        toasts.error("Please re-login, last login session expired.");
        localStorage.clear();
      }
      if (
        (decryptData && decryptData?.message) ||
        decryptData?.message === "Network Error"
      ) {
        toasts.error(decryptData?.message);
      }
      return decryptData;
    });
  console.log("----TAGGGG---", resp);
  return resp;
};
export const apiCallPut = async (url, data, params = {}, toastOn) => {
  let dataFiltered = await encryptionFilter(data);
  const resp = await axiosApi
    .put(formatUrl(url, params), dataFiltered)
    .then(async (res) => {
      console.log("----RES--1-", res?.data);
      let decryptData = decryptionFilter(res?.data);
      console.log("----RES--2-", decryptData);
      if (toastOn === true) {
        handleSuccess(decryptData);
      }
      return decryptData;
    })
    .catch((error) => {
      console.log("----RES--11-", error);
      let decryptData = decryptionFilter(error?.response?.data);
      console.log("--decryptData---", decryptData);
      if (error?.response?.status && error?.response?.status === 401) {
        toasts.error("Please re-login, last login session expired.");
        localStorage.clear();
      }
      if (
        (decryptData && decryptData?.message) ||
        decryptData?.message === "Network Error"
      ) {
        toasts.error(decryptData?.message);
      }
      return decryptData;
    });
  console.log("----TAGGGG---", resp);
  return resp;
};
export const apiCallPatch = async (url, data, params = {}, toastOn) => {
  let dataFiltered = await encryptionFilter(data);
  const resp = await axiosApi
    .patch(formatUrl(url, params), dataFiltered)
    .then(async (res) => {
      console.log("----RES--1-", res?.data);
      let decryptData = decryptionFilter(res?.data);
      console.log("----RES--2-", decryptData);
      if (toastOn === true) {
        handleSuccess(decryptData);
      }
      return decryptData;
    })
    .catch((error) => {
      console.log("----RES--11-", error);
      let decryptData = decryptionFilter(error?.response?.data);
      console.log("--decryptData---", decryptData);
      if (error?.response?.status && error?.response?.status === 401) {
        toasts.error("Please re-login, last login session expired.");
        localStorage.clear();
      }
      if (
        (decryptData && decryptData?.message) ||
        decryptData?.message === "Network Error"
      ) {
        toasts.error(decryptData?.message);
      }
      return decryptData;
    });
  console.log("----TAGGGG---", resp);
  return resp;
};

export const apiCallDelete = (url, params = {}, toastOn) => {
  return new Promise((resolve, reject) => {
    axiosApi
      .delete(formatUrl(url, params))
      .then((res) => {
        if (toastOn === true) {
          handleSuccess(res);
        }
        resolve(res.data);
      })
      .catch((error) => {
        handleError(error);
        reject(error);
      });
  });
};

const encryptionFilter = (data) => {
  if (!data?.entries && data?.entries === undefined) {
    let encD = IS_ENCRYPTION ? encryption(JSON.stringify(data)) : data;
    return IS_ENCRYPTION ? { reqData: encD } : data;
  } else {
    return data;
  }
};
const decryptionFilter = (data) => {
  if (data && data?.resData && typeof data?.resData == "string") {
    let decD = IS_ENCRYPTION ? JSON.parse(decryption(data?.resData)) : data;
    return IS_ENCRYPTION ? decD : data;
  } else {
    console.log("----ellll--", data);
    return data;
  }
};
