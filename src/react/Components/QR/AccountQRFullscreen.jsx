import React from "react";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";
import Dialog from "material-ui/Dialog";
import IconButton from "material-ui/IconButton";
import Slide from "material-ui/transitions/Slide";
import { ListItem, ListItemText } from "material-ui/List";
import Avatar from "material-ui/Avatar";

const Transition = props => <Slide direction={"up"} {...props} />;

import AccountQRCode from "./AccountQRCode";
import LazyAttachmentImage from "../AttachmentImage/LazyAttachmentImage";
import QRSvg from "./QRSvg";
import QRCode from "./QRCode";

const styles = theme => ({
    btnIcon: {
        color: theme.palette.text.secondary,
        width: 32,
        height: 32
    },
    dialog: {
        marginTop: 50
    },
    listItem: {
        paddingLeft: 0,
        paddingRight: 0
    },
    bigAvatar: {
        width: 45,
        height: 45
    },
    content: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
});

class AccountQRFullscreen extends React.PureComponent {
    state = {
        open: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { accounts, theme, classes } = this.props;

        let dialogContent = null;
        switch (this.props.mode) {
            case "ACCOUNT":
                const accountId =
                    this.props.accountId !== false
                        ? this.props.accountId
                        : this.props.selectedAccount;

                let accountInfo = false;
                let IBAN = "";
                accounts.map(account => {
                    if (account.id === accountId) {
                        accountInfo = account;
                    }
                });
                accountInfo.alias.map(alias => {
                    if (alias.type === "IBAN") {
                        IBAN = alias.value;
                    }
                });

                dialogContent = (
                    <React.Fragment>
                        <AccountQRCode accountId={this.props.accountId} />
                        <ListItem className={classes.listItem}>
                            <Avatar className={classes.bigAvatar}>
                                <LazyAttachmentImage
                                    width={45}
                                    BunqJSClient={this.props.BunqJSClient}
                                    imageUUID={
                                        accountInfo.avatar.image[0]
                                            .attachment_public_uuid
                                    }
                                />
                            </Avatar>
                            <ListItemText
                                primary={accountInfo.description}
                                secondary={IBAN}
                            />
                        </ListItem>
                    </React.Fragment>
                );
                break;
            case "TEXT":
                dialogContent = (
                    <React.Fragment>
                        <QRCode value={this.props.text} size={195} />
                        <ListItem className={classes.listItem} dense>
                            <ListItemText primary={this.props.text} />
                        </ListItem>
                    </React.Fragment>
                );
                break;
            case "HIDDEN":
                dialogContent = (
                    <React.Fragment>
                        <QRCode value={this.props.text} size={195} />
                    </React.Fragment>
                );
                break;
        }

        return (
            <React.Fragment>
                <IconButton onClick={this.handleClickOpen}>
                    <QRSvg />
                </IconButton>
                <Dialog
                    fullScreen
                    className={classes.dialog}
                    open={this.state.open}
                    onClose={this.handleRequestClose}
                    onClick={this.handleRequestClose}
                    transition={Transition}
                >
                    <div className={classes.content}>
                        <div style={{ width: 195 }}>{dialogContent}</div>
                    </div>
                </Dialog>
            </React.Fragment>
        );
    }
}

AccountQRFullscreen.defaultProps = {
    accountId: false,
    mode: "ACCOUNT"
};

const mapStateToProps = state => {
    return {
        accounts: state.accounts.accounts,
        selectedAccount: state.accounts.selectedAccount
    };
};

export default withStyles(styles)(
    connect(mapStateToProps)(AccountQRFullscreen)
);
