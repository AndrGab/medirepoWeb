import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import api from "../../../../services/Api";
import { useUserDispatch, signOut } from "../../../../context/UserContext";
import { useTranslation } from "react-i18next";

export function useBulletinsList() {
  const token = localStorage.getItem("token");
  var [rows, setRows] = useState([]);
  var userDispatch = useUserDispatch();
  const history = useHistory();
  var bulletinsNumber = 0;
  const { t } = useTranslation();

  useEffect(() => {
    api
      .get("/bulletins/list", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setRows(response.data.bulletin);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            toast.warning(t("accessDenied"));
            signOut(userDispatch, history);
          }
          if (error.response.status === 404) {
            toast.warning(t("bulletinsNotFound"));
          }
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }, [token, userDispatch, history, t]);

  bulletinsNumber = rows.length;
  return { bulletinsNumber };
}
