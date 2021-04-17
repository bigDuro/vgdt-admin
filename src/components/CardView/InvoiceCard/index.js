import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';
import { red, green, grey } from '@material-ui/core/colors';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import DoneIcon from '@material-ui/icons/Done';
import './index.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10px auto'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  green: {
    color: green[500]
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  avatar2: {
    backgroundColor: green[500],
  },
  status: {
    backgroundColor: '#009be5',
  },
  customer: {
    backgroundColor: '#666',
  },
  cardActions: {
    backgroundColor: grey[100]
  },
  billed: {
    backgroundColor: grey[100],
    color: green[500]
  }
}));

export default function InvoiceCard(props) {
  const { data, selected, setSelected, actions } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const isBilled = data.billed;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <Grid container spacing={0} alignItems="center" justify="space-between">
        <Grid item xs={12} className={isBilled ? classes.billed : ''}>
          <CardHeader
          avatar={
            <Avatar aria-label="status" className={classes.customer}>
            </Avatar>
          }
          action={
            <div>
            {!isBilled ? <Checkbox
              checked={selected.includes(data.id)}
              onClick={(event) => setSelected(event, data.id)}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            /> : <DoneIcon className={classes.billed}/>}
            </div>
          }
          title={`Customer`}
          subheader={<Link color="primary" href="#" onClick={(e) => actions.handleBrokerClick(e, data.brokerid)}>{data.brokerName}</Link>}
        />
      </Grid>
      <Grid item xs={12}>
          <CardHeader
          avatar={
            <Avatar aria-label="status" className={classes.avatar2}>
              $
            </Avatar>
          }
          title={`${data.ItemDescription}`}
          subheader={`$${data['*ItemAmount']}.00`}
        />
      </Grid>
        <Grid item xs={12}>
          <CardHeader
          avatar={
            <Avatar aria-label="pickup" className={classes.status}>
              #
            </Avatar>
          }
          title={`${data['*InvoiceNo']}`}
          subheader={`${data.ProductService}`}
        />
        </Grid>
        <Grid item xs={12}>
          <CardHeader
          avatar={
            <Avatar aria-label="drop" className={classes.avatar}>
              <LocalShippingIcon/>
            </Avatar>
          }
          title={`${data.ServiceDate}`}
          subheader={<Link color="primary" href="#" onClick={(e) => actions.handleLoadClick(e, data.loadId)}>Load Details: {data.loadId}</Link>}
        />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CardActions disableSpacing className={classes.cardActions}>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Due Date:</b> {data['*DueDate']}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Billing Address:</b>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {data.BillingAddress}
              </Typography>

            </CardContent>
          </Collapse>
        </Grid>
      </Grid>
    </Card>
  );
}
