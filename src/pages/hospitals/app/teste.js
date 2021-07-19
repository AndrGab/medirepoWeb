import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { toast } from 'react-toastify';
import api from '../../../services/Api';
import { DataGrid } from '@material-ui/data-grid';



const headCells = [
  { id: 'cd_paciente', numeric: false, disablePadding: true, label: 'Código Prontuário' },
  { id: 'atendimento', numeric: false, disablePadding: true, label: 'Código Atendimento' },
  { id: 'nome', numeric: false, disablePadding: true, label: 'Nome' },
  { id: 'dt_nascimento', numeric: false, disablePadding: true, label: 'Data Nascimento' },
  { id: 'dt_assinatura', numeric: false, disablePadding: true, label: 'Data Assinatura' }

];

const columns = [
  { field: 'cd_paciente', headerName: 'Prontuário', width: 150 },
  {
    field: 'atendimento',
    headerName: 'Atendimento',
    width: 180
  },
  {
    field: 'nome',
    headerName: 'Nome',
    width: 150,
    editable: true,
  },
  {
    field: 'dt_nascimento',
    headerName: 'Data Nascimento',
    width: 200,
    type: 'date',
    editable: true,
  },
  {
    field: 'dt_assinatura',
    headerName: 'Data Boletim',
    width: 200,
    type: 'date',
    editable: true,
  },

];

// const headCellsDown = [
//   { id: 'geral', numeric: false, disablePadding: false, label: 'Estado Geral' },
//   { id: 'pressao', numeric: false, disablePadding: false, label: 'Pressão Arterial' },
//   { id: 'febre', numeric: false, disablePadding: false, label: 'Febre' },
//   { id: 'respiracao', numeric: false, disablePadding: false, label: 'Respiração' },
//   { id: 'diurese', numeric: false, disablePadding: false, label: 'Diurese' },
//   { id: 'obs', numeric: false, disablePadding: false, label: 'Observação' },
//   { id: 'consciencia', numeric: false, disablePadding: false, label: 'Nível de Consciência' },
//   { id: 'medico', numeric: false, disablePadding: false, label: 'Médico' }
// ];


function Bulletin() {

  const token = localStorage.getItem("token");
  var [listBulletin, setlistBulletin] = useState([]);


  useEffect(() => {
    api
      .get("/bulletins/list", {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(response => {
        setlistBulletin(response.data.bulletin);
      })
      .catch(error => {
        toast.dark("Autenticação necessária. Use o Login/Senha recebido.");

        if (error.response) {
          console.log(error.response.status);

        } else if (error.request) {
          console.log(error.request);

        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }, [token]);

  console.log(listBulletin);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={listBulletin}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
export default withRouter(Bulletin);