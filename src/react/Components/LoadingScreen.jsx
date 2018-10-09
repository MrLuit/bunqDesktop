import React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import Icon from "@material-ui/core/Icon";

import CheckIcon from "@material-ui/icons/Check";
import RemoveIcon from "@material-ui/icons/Remove";

import Fade from "@material-ui/core/Fade";
const Transition = props => <Fade {...props} />;

const styles = {
    wrapperContainer: {
        height: "100%"
    },
    cardContent: {
        textAlign: "center",
        backgroundColor: "#ffffff"
    },
    list: {
        marginTop: 8
    },
    listItem: {
        paddingLeft: 0
    },
    checkbox: {
        padding: 0
    },
    formControlLabel: {
        color: "#000000"
    },
    text: {
        color: "#000000"
    }
};

class LoadingScreen extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false,
            loadingTypes: {
                secureKey: {
                    text: "Creating a secure key",
                    hasLoaded: true,
                    loading: false
                },
                decryptingData: {
                    text: "Decrypting session data",
                    hasLoaded: false,
                    loading: true
                },
                fetchingUserInfo: {
                    text: "Fetching user information",
                    hasLoaded: true,
                    loading: true
                },
                loadingStoredData: {
                    text: "Loading stored data",
                    hasLoaded: false,
                    loading: false
                }
            }
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ open: true });
        }, 1000);
        console.log("Mounted loadingscreen");
    }

    componentWillUnmount() {
        console.log("Unmounted loadingscreen");
    }

    componentDidUpdate(prevProps) {
        const { registrationLoading } = this.props;
        const loadingTypes = this.state.loadingTypes;
        let stateChanged = false;

        if (!loadingTypes.secureKey.hasLoaded) {
        }

        if (!loadingTypes.decryptingData.hasLoaded) {
        }

        if (!loadingTypes.fetchingUserInfo.hasLoaded) {
            const wasLoading = prevProps.userLoading;
            const isLoading = this.props.userLoading;

            if (wasLoading && !isLoading) {
                stateChanged = true;
                loadingTypes.fetchingUserInfo.hasLoaded = true;
                loadingTypes.fetchingUserInfo.loading = false;
            }
            if (!wasLoading && isLoading) {
                stateChanged = true;
                loadingTypes.fetchingUserInfo.loading = true;
            }
        }

        if (!loadingTypes.loadingStoredData.hasLoaded) {
            const wasLoading =
                prevProps.paymentsLoading ||
                prevProps.bunqMeTabsLoading ||
                prevProps.masterCardActionsLoading ||
                prevProps.requestInquiriesLoading ||
                prevProps.requestResponsesLoading;
            const isLoading =
                this.props.paymentsLoading ||
                this.props.bunqMeTabsLoading ||
                this.props.masterCardActionsLoading ||
                this.props.requestInquiriesLoading ||
                this.props.requestResponsesLoading;

            if (wasLoading && !isLoading) {
                stateChanged = true;
                loadingTypes.loadingStoredData.hasLoaded = true;
                loadingTypes.loadingStoredData.loading = false;
            }
            if (!wasLoading && isLoading) {
                stateChanged = true;
                loadingTypes.loadingStoredData.loading = true;
            }
        }

        if (stateChanged) {
            this.setState({
                loadingTypes: loadingTypes
            });
        }
    }

    render() {
        const { loadingTypes } = this.state;
        const { t, statusMessage, registrationLoading } = this.props;

        const loadingCount = Object.keys(loadingTypes).reduce(
            (accumulator, item) => {
                return (
                    accumulator + (loadingTypes[item].loading === true ? 1 : 0)
                );
            },
            0
        );
        const finishedCount = Object.keys(loadingTypes).reduce(
            (accumulator, item) => {
                return (
                    accumulator +
                    (loadingTypes[item].hasLoaded === true &&
                    loadingTypes[item].loading === false
                        ? 1
                        : 0)
                );
            },
            0
        );
        const MIN = 0;
        const MAX = Object.keys(loadingTypes).length;
        const normalise = value => ((value - MIN) * 100) / (MAX - MIN);

        const normalizedLoadingCount = normalise(loadingCount);
        const normalizedFinishedCount = normalise(finishedCount);

        let cardContent = (
            <CardContent style={styles.cardContent}>
                <Typography variant="subheading" style={styles.text}>
                    {statusMessage}
                </Typography>

                <LinearProgress
                    variant="buffer"
                    value={normalizedFinishedCount}
                    valueBuffer={
                        normalizedFinishedCount + normalizedLoadingCount
                    }
                />

                <List style={styles.list} dense={true}>
                    {Object.keys(loadingTypes).map(loadingTypeKey => {
                        const loadingType = loadingTypes[loadingTypeKey];
                        let statusComponent = null;
                        if (loadingType.loading) {
                            statusComponent = <CircularProgress size={20} />;
                        } else if (loadingType.hasLoaded === false) {
                            statusComponent = (
                                <Icon
                                    style={styles.checkbox}
                                    checked={true}
                                    color="primary"
                                >
                                    <CheckIcon />
                                </Icon>
                            );
                        } else {
                            statusComponent = (
                                <Icon>
                                    <RemoveIcon />
                                </Icon>
                            );
                        }
                        return (
                            <ListItem style={styles.listItem} dense={true}>
                                {statusComponent}
                                <ListItemText
                                    style={styles.text}
                                    primary={loadingType.text}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </CardContent>
        );

        return (
            <Dialog
                fullScreen
                open={this.state.open}
                TransitionComponent={Transition}
                style={{ overflow: "hidden" }}
            >
                <Grid
                    container
                    spacing={8}
                    justify={"center"}
                    alignItems={"center"}
                    style={styles.wrapperContainer}
                >
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        style={{ zIndex: 1 }}
                        className="login-wrapper"
                    >
                        <Card>{cardContent}</Card>
                    </Grid>

                    <img
                        src="./images/svg/login-bg2.svg"
                        id="login-background-image"
                    />

                    <span className="bunqdesktop-text-wrapper">
                        <span className="bunqdesktop-text-first">bunq</span>
                        <span className="bunqdesktop-text-second">Desktop</span>
                    </span>
                </Grid>
            </Dialog>
        );
    }
}

const mapStateToProps = state => {
    return {
        statusMessage: state.application.status_message,

        registrationLoading: state.registration.loading,

        paymentsLoading: state.payments.loading,
        bunqMeTabsLoading: state.bunq_me_tabs.loading,
        masterCardActionsLoading: state.master_card_actions.loading,
        requestInquiriesLoading: state.request_inquiries.loading,
        requestResponsesLoading: state.request_responses.loading,

        users: state.users.users,
        user: state.user.user,
        userLoading: state.user.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(translate("translations")(LoadingScreen));
