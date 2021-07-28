import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import Modal from '@material-ui/core/Modal';
import { withStyles } from "@material-ui/core/styles";
import BulletinAdd from "./BulletinAdd";
// import { makeStyles } from '@material-ui/core/styles';


const defaultToolbarStyles = {
    iconButton: {
    },
};

// const useModalStyles = makeStyles((theme) => ({

//     title: {
//         flex: '1 1 100%',
//     },
//     paper: {
//         position: 'absolute',
//         width: 600,
//         backgroundColor: theme.palette.background.paper,
//         border: '2px solid #000',
//         boxShadow: theme.shadows[5],
//         padding: theme.spacing(2, 4, 3),
//     },

// }));

class CustomToolbarAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    handleClick = () => {
        console.log("clicked on icon!");
    }

    getModalStyle() {
        return {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        };
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Tooltip title={"Adicionar"}>
                    <IconButton className={classes.iconButton} onClick={this.handleOpen}>
                        <AddIcon className={classes.deleteIcon} />
                    </IconButton>
                </Tooltip>
                <Modal
                    open={() => this.handleOpen}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className={classes.paper}>
                        <BulletinAdd />
                    </div>
                </Modal>
            </React.Fragment>
        );
    }

}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbarAdd" })(CustomToolbarAdd);