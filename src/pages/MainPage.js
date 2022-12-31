import { Container, Box, Grid, Tab, Tabs, Typography, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import sessionService from '../services/session.service';
import Scrollbar from '../components/scrollbar';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default function MainPage() {
  const { id } = useParams();
  const [tabState, setTabState] = useState('logs');
  const handleChange = (_, newValue) => {
    setTabState(newValue);
  };
  return (
    <Container maxWidth="xl">
      <Tabs
        value={tabState}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="logs" label="Logs" />
        <Tab value="video" label="Video" />
      </Tabs>
      <TabPanel value={tabState} index="logs">
        <Logs id={id} />
      </TabPanel>
      <TabPanel value={tabState} index="video">
        <Video />
      </TabPanel>
    </Container>
  );
}

function Logs(props) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (props.id)
      sessionService.getLogsBySessionId(props.id).then((body) => {
        setLogs(body);
      });
    else setLogs([]);
  }, [props.id]);

  return (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box>
        <Grid container direction="column" justifyContent="center" spacing={1}>
          {logs.map((log) => (
            <LogItem key={log.request_id} {...log} />
          ))}
        </Grid>
      </Box>
    </Scrollbar>
  );
}
function LogItem(props) {
  return (
    <Grid container  direction={'row'}>
      <Grid justifyContent="center" item  alignItems="center" padding={1} xs={1}>
        {props.elapsed_time}
      </Grid>
      <Grid justifyContent="center"  item  alignItems="center" padding={1} xs={3}>
        {props.url}
      </Grid>
      <Grid justifyContent="center"  item  alignItems="center" padding={1} xs={12}>
        {JSON.stringify(props.payload,null,2)}
      </Grid>
      <Grid justifyContent="center"  item  alignItems="center" padding={1} xs={12}>
        {JSON.stringify(props.response,null,2)}
      </Grid>
      <Divider />
    </Grid>
  );
}
function Video(props) {
  return <>{props.id}</>;
}
