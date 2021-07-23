import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';
import api from '../../../../services/Api';
import { useUserDispatch, signOut } from "../../../../context/UserContext";


export function useBulletinsList() {

  const token = localStorage.getItem("token");
  var [rows, setRows] = useState([]);
  var userDispatch = useUserDispatch();
  const history = useHistory();



  useEffect(() => {
    api
      .get("/bulletins/list", {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(response => {
        setRows(response.data.bulletin);
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 401) {
            toast.warning("Acesso Negado!");
            signOut(userDispatch, history)
          }
          if (error.response.status === 404) {
            toast.warning("Não há boletins cadastrados!");
          }

        } else if (error.request) {
          console.log(error.request);

        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }, [token, userDispatch, history])

  return { rows }

}
