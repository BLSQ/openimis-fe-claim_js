import { Grid } from "@material-ui/core";
import { PublishedComponent } from "@openimis/fe-core";
import React from "react";

const NhiaClaimsRejectedReport = (props) => {
  const { values, setValues } = props;

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <PublishedComponent
          pubRef="core.DatePicker"
          value={values.startDate}
          module="claim"
          required
          label="NhiaClaimsRejectedReport.startDate"
          onChange={(startDate) => setValues({ ...values, startDate })}
        />
      </Grid>
      <Grid item>
        <PublishedComponent
          pubRef="core.DatePicker"
          value={values.endDate}
          module="claim"
          required
          label="NhiaClaimsRejectedReport.endDate"
          onChange={(endDate) => setValues({ ...values, endDate })}
        />
      </Grid>
    </Grid>
  );
};

export default NhiaClaimsRejectedReport;
