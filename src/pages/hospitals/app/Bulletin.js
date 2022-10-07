import * as React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { CircularProgress, Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import api from '../../../services/Api';
import { useUserDispatch, signOut } from '../../../context/UserContext';
import MUIDataTable from 'mui-datatables';
import Modal from '@material-ui/core/Modal';
import BulletinsView from './components/BulletinView';
import BulletinsAdd from './components/BulletinAdd';
import { makeStyles } from '@material-ui/core/styles';
import CustomToolbarAdd from './components/CustomToolbarAdd';
import { useTranslation } from 'react-i18next';

const useModalStyles = makeStyles((theme) => ({
  title: {
    flex: '1 1 100%',
  },
  paper: {
    position: 'absolute',
    width: '80%',
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
  const token = localStorage.getItem('token');
  const history = useHistory();
  var bulletinList = [];
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [selected, setSelected] = React.useState('');
  const classes = useModalStyles();
  const { t } = useTranslation();

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
    fetchData();
  };

  async function BulletinsDelete(list) {
    const token = localStorage.getItem('token');
    var responseDelete = [];
    setIsLoading(true);

    list.forEach((bulletinId, index) => {
      responseDelete[index] = api.delete('/bulletins/' + bulletinId, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
    });
    const results = await Promise.allSettled(responseDelete);

    const fulfilled = results.filter((result) => result.status === 'fulfilled').map((result) => result.value.status);
    console.log(fulfilled);

    const rejected = results.filter((result) => result.status === 'rejected').map((result) => result.reason);
    console.log(rejected);

    if (fulfilled.length > 0) {
      toast.success(fulfilled.length + ' ' + t('bulletinsDeleted'));
    }
    if (rejected.length > 0) {
      toast.error(t('couldNotDelete') + ' ' + rejected.length + ' ' + t('bulletins'));
    }
    fetchData();
  }

  const fetchData = () => {
    setIsLoading(true);
    api
      .get('/bulletins/list', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        setRows(response.data.bulletin);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            toast.error(t('accessDenied'));
            signOut(userDispatch, history);
          }
          if (error.response.status === 404) {
            toast.warning(t('bulletinsNotFound'));
          }
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
        setIsLoading(false);
      });
  };

  const options = {
    filterType: 'dropdown',
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
    download: rows.length ? true : 'disabled',
    textLabels: {
      body: {
        noMatch: t('bulletinsNotFound'),
        toolTip: t('sort'),
        columnHeaderTooltip: (column) => `${t('sortBy')} ${column.label}`,
      },
      pagination: {
        next: t('nextPage'),
        previous: t('previousPage'),
        rowsPerPage: t('rowsPerPage'),
        displayRows: t('of'),
      },
      toolbar: {
        search: t('search'),
        downloadCsv: t('downloadCsv'),
        print: t('print'),
        viewColumns: t('viewColumns'),
        filterTable: t('filterTable'),
      },
      filter: {
        all: t('all'),
        title: t('filters'),
        reset: t('reset'),
      },
      viewColumns: {
        title: t('viewColumns'),
        titleAria: t('viewHideColumns'),
      },
      selectedRows: {
        text: t('selectedRows'),
        delete: t('delete'),
        deleteAria: t('deleteSelectedRows'),
      },
    },
    customToolbar: () => {
      return <CustomToolbarAdd data={handleOpenAdd} toolTip={t('add')} />;
    },
  };

  const columns = [
    {
      name: 'cd_patient',
      label: t('patientCode'),
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'attendance',
      label: t('attendanceCode'),
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'name',
      label: t('patientName'),
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'dt_birth',
      label: t('birthday'),
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'dt_signature',
      label: t('signedAt'),
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
      position: 'absolute',
    };
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <MUIDataTable
        title={
          <Typography variant="h6">
            {t('bulletins')}
            {isLoading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
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
        style={{ overflow: 'scroll' }}
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
        style={{ overflow: 'scroll' }}
      >
        <div style={modalStyle} className={classes.paper}>
          <BulletinsAdd />
        </div>
      </Modal>
    </div>
  );
}
export default withRouter(Bulletin);
