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
        toast.dark("Autenticação necessária. Use o Login/Senha recebido.");

        if (error.response) {
          console.log(error.response.status);
          if (error.response.status === 401) {
            toast.warning("Acesso Negado!");
            signOut(userDispatch, history)

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
