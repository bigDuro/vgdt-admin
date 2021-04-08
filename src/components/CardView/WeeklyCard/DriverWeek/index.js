import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


export default function DriverWeek(props) {
  const { totals, icons, driver } = props;

  return (
    <React.Fragment>
      <CardHeader
        avatar={
          <Avatar aria-label="pickup" className={""}>
            {icons('Driver')}
          </Avatar>
        }
        title={`${driver}`}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Rate: {totals.driverRate}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Pay: {totals.driverPay}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Detention Pay: ${totals.detentionPay}.00
        </Typography>
      </CardContent>
    </React.Fragment>
  )
}
