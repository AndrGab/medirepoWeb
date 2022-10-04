import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../../services/Api";
import { useTranslation } from "react-i18next";

export function useHospitalList() {
  var [listHosp, setlistHosp] = useState([]);
  var hospitalNumber = 0;
  const { t } = useTranslation();

  useEffect(() => {
    api
      .get("/hospitals/list")
      .then((response) => {
        setlistHosp(response.data.hospital);
      })
      .catch((err) => {
        console.log(err);
        toast.error(t("loadHospitalsError"));
      });
  }, [t]);
  hospitalNumber = listHosp.length;
  return { hospitalNumber };
}
