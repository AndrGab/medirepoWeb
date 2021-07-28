import * as React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { CircularProgress, Typography } from "@material-ui/core";
import { toast } from "react-toastify";
import api from "../../../services/Api";
import { useUserDispatch, signOut } from "../../../context/UserContext";
import MUIDataTable from "mui-datatables";
import Modal from '@material-ui/core/Modal';
import BulletinsView from "./components/BulletinView";
import { makeStyles } from '@material-ui/core/styles';
import CustomToolbarAdd from "./components/CustomToolbarAdd";

const useModalStyles = makeStyles((theme) => ({

  title: {
    flex: '1 1 100%',
  },
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

}));


function Bulletin() {
  const [rows, setRows] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  var userDispatch = useUserDispatch();
  const token = localStorage.getItem("token");
  const history = useHistory();
  var bulletinList = [];
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [selected, setSelected] = React.useState('');
  const classes = useModalStyles();


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  async function BulletinsDelete(list) {
    const token = localStorage.getItem("token");
    var responseDelete = [];
    setIsLoading(true);

    list.forEach((bulletinId, index) => {
      responseDelete[index] = api.delete("/bulletins/" + bulletinId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    });
    const results = await Promise.allSettled(responseDelete);

    const fulfilled = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value.status);
    console.log(fulfilled);

    const rejected = results
      .filter((result) => result.status === "rejected")
      .map((result) => result.reason);
    console.log(rejected);

    if (fulfilled.length > 0) {
      toast.success(fulfilled.length + " boletim(s) apagado(s) com sucesso");
    }
    if (rejected.length > 0) {
      toast.error("Não foi possível apagar " + rejected.length + " boletim(s)");
    }
    fetchData();
  }

  const fetchData = () => {
    setIsLoading(true);
    api
      .get("/bulletins/list", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setRows(response.data.bulletin);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            toast.error("Acesso Negado!");
            signOut(userDispatch, history);
          }
          if (error.response.status === 404) {
            toast.warning("Não há boletins cadastrados!");
          }
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
        setIsLoading(false);
      });
  };

  const options = {
    filterType: "dropdown",
    serverSide: false,
    onTableInit: () => {
      fetchData();
    },
    onRowClick: (rowData, rowMeta) => {
      const rowsValue = rows[rowMeta.dataIndex];
      setSelected(rowsValue.id);
      console.log(selected);
      handleOpen();
    },
    onRowsDelete: (rowsDeleted, newDataTable) => {
      bulletinList = [];
      rowsDeleted.data.forEach((list) => {
        bulletinList.push(rows[list.dataIndex].id);
      });
      BulletinsDelete(bulletinList);
    },
    textLabels: {
      body: {
        noMatch: "Desculpe, nenhum boletim encontrado",
        toolTip: "Ordenar",
        columnHeaderTooltip: (column) => `Ordernar por ${column.label}`,
      },
      pagination: {
        next: "Próxima Página",
        previous: "Página Anterior",
        rowsPerPage: "Linhas por Página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Download CSV",
        print: "Imprimir",
        viewColumns: "Visualizar Colunas",
        filterTable: "Filtrar Tabela",
      },
      filter: {
        all: "Todos",
        title: "FILTROS",
        reset: "LIMPAR",
      },
      viewColumns: {
        title: "Mostrar Colunas",
        titleAria: "Esconder/Mostrar Colunas",
      },
      selectedRows: {
        text: "linha(s) selecionada(s)",
        delete: "Apagar",
        deleteAria: "Apagar Linhas Selecionadas",
      },
    },
    customToolbar: () => {
      return (
        <CustomToolbarAdd data={handleOpen}/>
      );
    }
  };

  const columns = [
    {
      name: "cd_paciente",
      label: "Código Prontuário",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "atendimento",
      label: "Código Atendimento",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "nome",
      label: "Nome do Paciente",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "dt_nascimento",
      label: "Data Nascimento",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "dt_assinatura",
      label: "Data Boletim",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  function getModalStyle() {
    return {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <MUIDataTable
        title={
          <Typography variant="h6">
            Boletins{" "}
            {isLoading && (
              <CircularProgress
                size={24}
                style={{ marginLeft: 15, position: "relative", top: 4 }}
              />
            )}
          </Typography>
        }
        data={rows}
        columns={columns}
        options={options}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <BulletinsView bulletinId={selected} />
        </div>
      </Modal>
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <BulletinsAdd />
        </div>
      </Modal>
    </div>
  );
}
export default withRouter(Bulletin);
