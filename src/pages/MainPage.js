import { Container, Box, Grid, Tab, Tabs, Typography, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import sessionService from '../services/session.service';
import Scrollbar from '../components/scrollbar';
import JsonViewer from '../components/json-viewer';
import Duration from '../components/Duration';
import useServerSentEvents from '../services/ServerSideEvents';
import { backendUrl } from '../config';

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
        <Video id={id} />
      </TabPanel>
    </Container>
  );
}

function Logs(props) {
  const [logs, setLogs] = useState([]);
  const eventListeners = {
    created: (e) => {
      const log = JSON.parse(e.data);
      setLogs((data) => [...data, log]);
    },
    updated: (e) => {
      const log = JSON.parse(e.data);
      setLogs((data) => {
        // eslint-disable-next-line
        const index = data.findIndex(({ request_id }) => request_id === log.request_id);
        data[index] = log;
        return [...data];
      });
    },
  };
  const { errors } = useServerSentEvents(`${backendUrl}/api/sessions/${props.id}/logs/sse`, eventListeners);
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
      {/* <Box> */}
      <Grid container direction="column" justifyContent="center" spacing={1}>
        {logs.map((log) => (
          <LogItem key={log.request_id} {...log} />
        ))}
      </Grid>
      {/* </Box> */}
    </Scrollbar>
  );
}
function LogItem(props) {
  return (
    <>
      <Grid container direction={'row'}>
        <Grid justifyContent="center" item alignItems="center" padding={1} xs={2}>
          <Duration seconds={props.elapsed_time} />
        </Grid>
        <Grid justifyContent="center" item alignItems="center" padding={1} xs={8}>
          {props.message ?? props.url}
        </Grid>
        <Grid justifyContent="center" item alignItems="center" padding={1} xs={2}>
          {props.status}
        </Grid>
        {props.response?.screenshot && (
          <Grid container justifyContent="center" item alignItems="center" padding={1} xs={12}>
            {' '}
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="The house from the offer."
              src={`${backendUrl}/${props.response.screenshot}`}
            />
          </Grid>
        )}
        <Grid justifyContent="center" item alignItems="center" padding={1} xs={6}>
          {/* {JSON.stringify(props.payload, null, 2)} */}
          <JsonViewer data={props.payload} title={'Payload'} />
        </Grid>
        <Grid justifyContent="center" item alignItems="center" padding={1} xs={6}>
          <JsonViewer data={props.response} title={'Response'} />
        </Grid>
      </Grid>
      <Divider />
    </>
  );
}
function Video(props) {
  return <Grid>{props.id}</Grid>;
}
