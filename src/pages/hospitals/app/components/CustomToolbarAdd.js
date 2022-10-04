import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarStyles = {
  iconButton: {},
};

class CustomToolbarAdd extends React.Component {
  render() {
    const { classes, data, toolTip } = this.props;
    return (
      <React.Fragment>
        <Tooltip title={toolTip}>
          <IconButton className={classes.iconButton} onClick={data}>
            <AddIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbarAdd" })(
  CustomToolbarAdd
);
