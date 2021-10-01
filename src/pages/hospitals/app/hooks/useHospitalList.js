import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../../services/Api';

export function useHospitalList() {

  var [listHosp, setlistHosp] = useState([]);
  var hospitalNumber = 0;

  useEffect(() => {
    api
      .get("/hospitals/list")
      .then((response) => {
        setlistHosp(response.data.hospital);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "Não foi possível carregar a lista de Hospitais. Tente mais tarde."
        );
      });
  }, []);
  hospitalNumber = listHosp.length;
  return { hospitalNumber }

}
