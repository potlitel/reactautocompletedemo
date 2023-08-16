import { api } from "../configs/axiosConfig";
import { defineCancelApiObject } from "../configs/axiosUtils";

import React from "react";

export const UsersAPI = {
  getAll: async function (cancel = false) {
    const response = await api.request({
      url: "/users/",
      method: "GET",
      signal: cancel
        ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal
        : undefined,
    });

    return response;
  },
};

// defining the cancel API object for ProductAPI
const cancelApiObject = defineCancelApiObject(UsersAPI);
