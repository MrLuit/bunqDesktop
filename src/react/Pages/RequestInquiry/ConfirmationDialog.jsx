import React from "react";
import Button from "material-ui/Button";
import Divider from "material-ui/Divider";
import List, { ListItem, ListItemText } from "material-ui/List";
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle
} from "material-ui/Dialog";
import { formatMoney } from "../../Helpers/Utils";

export default class ConfirmationDialog extends React.Component {
    render() {
        const {
            confirmModalOpen,
            description,
            account,
            targets,
            amount,
            t
        } = this.props;

        if (!confirmModalOpen) {
            return null;
        }

        // create a list of ListItems with our targets
        const confirmationModelTargets = targets.map(targetItem => {
            let primaryText = "";
            let secondaryText = "";

            switch (targetItem.type) {
                case "PHONE":
                    primaryText = `${t("Phone")}: ${targetItem.value}`;
                    break;
                case "EMAIL":
                    primaryText = `${t("Email")}: ${targetItem.value}`;
                    break;
                default:
                    return null;
            }

            return [
                <ListItem>
                    <ListItemText
                        primary={primaryText}
                        secondary={secondaryText}
                    />
                </ListItem>,
                <Divider />
            ];
        });

        return (
            <Dialog
                open={confirmModalOpen}
                keepMounted
                onClose={this.closeModal}
            >
                <DialogTitle>Confirm the request</DialogTitle>
                <DialogContent>
                    <List>
                        <ListItem>
                            <ListItemText
                                primary="To"
                                secondary={`${account.description} ${account
                                    .balance.value}`}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={t("Description")}
                                secondary={
                                    description.length <= 0 ? (
                                        t("None")
                                    ) : (
                                        description
                                    )
                                }
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={t("Amount")}
                                secondary={`${formatMoney(amount)}`}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={t("Targets") + ": "} />
                        </ListItem>
                        <Divider />
                        {confirmationModelTargets}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="raised"
                        onClick={this.props.closeModal}
                        color="secondary"
                    >
                        {t("Cancel")}
                    </Button>
                    <Button
                        variant="raised"
                        onClick={this.props.sendInquiry}
                        color="primary"
                    >
                        {t("Confirm")}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
