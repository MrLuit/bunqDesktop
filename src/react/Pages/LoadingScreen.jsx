import React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import Redirect from "react-router-dom/Redirect";
import Helmet from "react-helmet";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Visibility from "@material-ui/icons/Visibility";

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
        const {
            t,
            statusMessage,
            paymentsLoading,
            registrationLoading
        } = this.props;

        let cardContent = (
            <CardContent style={styles.cardContent}>
                <CircularProgress size={50} />

                <Typography variant="subheading" style={styles.text}>
                    {statusMessage}
                </Typography>

                <LinearProgress variant="determinate" value={23} />

                <List style={styles.list} dense={true}>
                    {loadingTypes.map(loadingType => {
                        return (
                            <ListItem style={styles.listItem} dense={true}>
                                {loadingType.loading ||
                                loadingType.hasLoaded === false ? (
                                    <CircularProgress size={20} />
                                ) : (
                                    <Checkbox
                                        style={styles.checkbox}
                                        checked={true}
                                        color="primary"
                                    />
                                )}

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
            <Grid
                container
                spacing={16}
                justify={"center"}
                alignItems={"center"}
                style={styles.wrapperContainer}
            >
                <Helmet>
                    <title>{`bunqDesktop - ${t("Loading")}`}</title>
                </Helmet>

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

const mapDispatchToProps = (dispatch, ownProps) => {
    const { BunqJSClient } = ownProps;
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(translate("translations")(LoadingScreen));
