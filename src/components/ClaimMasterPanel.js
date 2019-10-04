import React, { Component } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { injectIntl } from 'react-intl';
import { bindActionCreators } from "redux";
import {
    formatMessage,
    PublishedComponent, AmountInput, TextInput,
} from "@openimis/fe-core";
import { Grid } from "@material-ui/core";
import _ from "lodash";
import { claimedAmount, approvedAmount } from "../helpers/amounts";
import { claimHealthFacilitySet } from "../actions";

const styles = theme => ({
    paper: theme.paper.paper,
    paperHeader: theme.paper.header,
    paperHeaderAction: theme.paper.action,
    item: theme.paper.item,
});

class ClaimMasterPanel extends Component {

    state = {
        data: {}
    }

    componentDidMount() {
        this.setState({ data: this.props.edited });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((prevProps.edited_id && !this.props.edited_id) ||
            prevProps.reset !== this.props.reset
        ) {
            this.setState({ data: this.props.edited });
        } else if (!_.isEqual(prevProps.edited, this.props.edited)) {
            this.setState({ data: this.props.edited })
        }
    }

    updateAttribute = (attr, v) => {
        let data = { ...this.state.data };
        data[attr] = v;
        this.props.onEditedChanged(data);
    }

    updateHealthFacility = v => {
        let data = { ...this.state.data };
        data["healthFacility"] = v;
        if (!!data["services"]) {
            data["services"].forEach(s => s['priceAsked']=null)
        }
        if (!!data["items"]) {
            data["items"].forEach(s => s['priceAsked']=null)
        }
        if (!!v) {
            this.props.claimHealthFacilitySet(v)
        }
        this.props.onEditedChanged(data);
    }

    render() {
        const { intl, classes, edited, reset, forReview, forFeedback } = this.props;
        if (!edited) return null;
        let totalClaimed = 0;
        let totalApproved = 0;
        if (edited.items) {
            totalClaimed += edited.items.reduce(
                (sum, r) => sum + claimedAmount(r), 0);
            totalApproved += edited.items.reduce(
                (sum, r) => sum + approvedAmount(r), 0);
        }
        if (edited.services) {
            totalClaimed += edited.services.reduce(
                (sum, r) => sum + claimedAmount(r), 0);
            totalApproved += edited.services.reduce(
                (sum, r) => sum + approvedAmount(r), 0);
        }
        edited.claimed = _.round(totalClaimed, 2);
        edited.approved = _.round(totalApproved, 2);
        let readOnly = !!forReview || !!forFeedback;
        return (
            <Grid container>
                <Grid item xs={3} className={classes.item}>
                    <PublishedComponent
                        id="location.HealthFacilityPicker"
                        value={edited.healthFacility}
                        reset={reset}
                        onChange={(v, s) => this.updateHealthFacility(v)}
                        readOnly={readOnly}
                    />
                </Grid>
                <Grid item xs={3} className={classes.item}>
                    <PublishedComponent
                        id="insuree.InsureePicker"
                        value={edited.insuree}
                        reset={reset}
                        onChange={(v, s) => this.updateAttribute("insuree", v, s)}
                        readOnly={readOnly}
                    />
                </Grid>
                <Grid item xs={2} className={classes.item}>
                    <PublishedComponent id="core.DatePicker"
                        value={edited.dateClaimed}
                        module="claim"
                        label="claimedDate"
                        reset={reset}
                        onChange={d => this.updateAttribute("dateClaimed", d)}
                        readOnly={readOnly}
                    />
                </Grid>
                <Grid item xs={2} className={classes.item}>
                    <PublishedComponent id="core.DatePicker"
                        value={edited.dateFrom}
                        module="claim"
                        label="visitDateFrom"
                        reset={reset}
                        onChange={d => this.updateAttribute("dateFrom", d)}
                        readOnly={readOnly}
                    />
                </Grid>
                <Grid item xs={2} className={classes.item}>
                    <PublishedComponent id="core.DatePicker"
                        value={edited.dateTo}
                        module="claim"
                        label="visitDateTo"
                        reset={reset}
                        onChange={d => this.updateAttribute("dateTo", d)}
                        readOnly={readOnly}
                    />
                </Grid>
                <Grid item xs={3} className={classes.item}>
                    <PublishedComponent
                        id="medical.VisitTypePicker"
                        name="visitType"
                        withNull={false}
                        value={edited.visitType}
                        reset={reset}
                        onChange={(v, s) => this.updateAttribute("visitType", v)}
                        readOnly={readOnly}
                    />
                </Grid>
                <Grid item xs={3} className={classes.item}>
                    <PublishedComponent
                        id="medical.DiagnosisPicker"
                        name="mainDiagnosis"
                        label={formatMessage(intl, "claim", "mainDiagnosis")}
                        value={edited.icd}
                        reset={reset}
                        onChange={(v, s) => this.updateAttribute("icd", v)}
                        readOnly={readOnly}
                    />
                </Grid>
                <Grid item xs={2} className={classes.item}>
                    <TextInput
                        module="claim"
                        label="code"
                        value={edited.code}
                        reset={reset}
                        onChange={v => this.updateAttribute("code", v)}
                        readOnly={readOnly}
                    />
                </Grid>
                <Grid item xs={2} className={classes.item}>
                    <TextInput
                        module="claim"
                        label="guaranteeId"
                        value={edited.guaranteeId}
                        reset={reset}
                        onChange={v => this.updateAttribute("guaranteeId", v)}
                        readOnly={readOnly}
                    />
                </Grid>
                <Grid item xs={forReview ? 1 : 2} className={classes.item}>
                    <AmountInput
                        value={edited.claimed}
                        module="claim"
                        label="claimed"
                        readOnly={true}
                    />
                </Grid>
                {forReview &&
                    <Grid item xs={1} className={classes.item}>
                        <AmountInput
                            value={edited.approved}
                            module="claim"
                            label="approved"
                            readOnly={true}
                        />
                    </Grid>
                }
                <Grid item xs={3} className={classes.item}>
                    <PublishedComponent
                        id="medical.DiagnosisPicker"
                        name="secDiagnosis1"
                        label={formatMessage(intl, "claim", "secDiagnosis1")}
                        value={edited.icd1}
                        reset={reset}
                        onChange={(v, s) => this.updateAttribute("icd1", v)}
                        readOnly={readOnly}
                    />
                </Grid>
                <Grid item xs={3} className={classes.item}>
                    <PublishedComponent
                        id="medical.DiagnosisPicker"
                        name="secDiagnosis2"
                        label={formatMessage(intl, "claim", "secDiagnosis2")}
                        value={edited.icd2}
                        reset={reset}
                        onChange={(v, s) => this.updateAttribute("icd2", v)}
                        readOnly={readOnly}
                    />
                </Grid>
                <Grid item xs={3} className={classes.item}>
                    <PublishedComponent
                        id="medical.DiagnosisPicker"
                        name="secDiagnosis3"
                        label={formatMessage(intl, "claim", "secDiagnosis3")}
                        value={edited.icd3}
                        reset={reset}
                        onChange={(v, s) => this.updateAttribute("icd3", v)}
                        readOnly={readOnly}
                    />
                </Grid>
                <Grid item xs={3} className={classes.item}>
                    <PublishedComponent
                        id="medical.DiagnosisPicker"
                        name="secDiagnosis4"
                        label={formatMessage(intl, "claim", "secDiagnosis4")}
                        value={edited.icd4}
                        reset={reset}
                        onChange={(v, s) => this.updateAttribute("icd4", v)}
                        readOnly={readOnly}
                    />
                </Grid>
                <Grid item xs={6} className={classes.item}>
                    <TextInput
                        module="claim"
                        label="explanation"
                        value={edited.explanation}
                        reset={reset}
                        onChange={v => this.updateAttribute("explanation", v)}
                        readOnly={readOnly}
                    />
                </Grid>
                <Grid item xs={6} className={classes.item}>
                    <TextInput
                        module="claim"
                        label="adjustment"
                        value={edited.adjustment}
                        reset={reset}
                        onChange={v => this.updateAttribute("adjustment", v)}
                        readOnly={!!forFeedback}
                    />
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state, props) => ({
    userHealthFacilityFullPath: !!state.loc ? state.loc.userHealthFacilityFullPath : null,
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ claimHealthFacilitySet }, dispatch);
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(withTheme(withStyles(styles)(ClaimMasterPanel))))