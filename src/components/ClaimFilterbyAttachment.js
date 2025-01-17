import React, { Component } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { Grid} from "@material-ui/core";
import { TextInput } from "@openimis/fe-core";

const styles = theme => ({
    item: {
        padding: theme.spacing(1)
    },
});


class ClaimFilterbyAttachment extends Component {

    render() {
        const { classes, filters, onChangeFilters } = this.props;

        return (
            <>
            <Grid item xs={3} className={classes.item}>
                <TextInput
                    module="claim"
                    label="claim.filter.attachments.type"
                    name="type"
                    value={filters["type"] && filters["type"]["value"]}
                    onChange={(v) => onChangeFilters([
                        {
                            id: "type",
                            value: v,
                            filter: !!v ? `attachments_Type_Icontains: "${v}"` : null,
                        },
                    ])}
                />
            </Grid>
            <Grid item xs={3} className={classes.item}>
                <TextInput
                    module="claim"
                    label="claim.filter.attachments.title"
                    name="title"
                    value={filters["title"] && filters["title"]["value"]}
                    onChange={(v) => onChangeFilters([
                        {
                            id: "title",
                            value: v,
                            filter: !!v ? `attachments_Title_Icontains: "${v}"` : null,
                        },
                    ])}
                />
            </Grid>
            </>
        )
    }
}

export default withTheme(withStyles(styles)(ClaimFilterbyAttachment));
