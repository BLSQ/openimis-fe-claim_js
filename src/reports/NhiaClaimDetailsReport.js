import { Grid } from "@material-ui/core";
import { PublishedComponent, useModulesManager, useTranslations } from "@openimis/fe-core";
import React from "react";

const NhiaClaimDetailsReport = (props) => {
  const { values, setValues } = props;
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations("claim", modulesManager);

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <PublishedComponent
          pubRef="core.DatePicker"
          value={values.startDate}
          required
          module="claim"
          label={formatMessage("NhiaClaimDetailsReport.startDate")}
          onChange={(startDate) => setValues({ ...values, startDate })}
        />
      </Grid>
      <Grid item>
        <PublishedComponent
          pubRef="core.DatePicker"
          value={values.endDate}
          required
          module="claim"
          label={formatMessage("NhiaClaimDetailsReport.endDate")}
          onChange={(endDate) => setValues({ ...values, endDate })}
        />
      </Grid>
      <Grid item>
        <PublishedComponent
          pubRef="claim.ClaimStatusPicker"
          value={values.status}
          module="claim"
          label="claim.claimStatus"
          onChange={(status) => setValues({ ...values, status })}
        />
      </Grid>
    </Grid>
  );
};

export default NhiaClaimDetailsReport;
