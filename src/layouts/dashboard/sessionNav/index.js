import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Box, ListItemText, List, Drawer, IconButton, Toolbar, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
//
import { StyledNavItem, StyledNavItemIcon } from '../../../components/nav-section/styles';
// service
import sessionService from '../../../services/session.service';
import { NAV_WIDTH } from '../nav';
import useServerSentEvents from '../../../services/ServerSideEvents';
import { backendUrl } from '../../../config';

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

export default function SessionNav({ onOpenNav, ...other }) {
  const [sessions, setSessions] = useState([]);
  const eventListeners = {
    created: (e) => {
      const session = JSON.parse(e.data);
      setSessions((data) => [session, ...data]);
    },
    updated: (e) => {
      const session = JSON.parse(e.data);
      console.log(session);
      setSessions((data) => {
        const index = data.findIndex(({ id }) => id === session.id);
        data[index] = session;
        return [...data];
      });
    },
  };
  const { error, eventSource } = useServerSentEvents(`${backendUrl}/api/sessions/sse`, eventListeners);
  // eventSource.addEventListener('message', (e) => {
  //   console.log(e.data);
  // });
  useEffect(() => {
    sessionService.getSessions().then((body) => {
      setSessions(body || []);
    });
  }, []);
  const renderContent = (
    <>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      </StyledToolbar>
      <Divider />

      <Scrollbar
        sx={{
          height: 1,
          '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
        }}
      >
        <Box {...other}>
          <List disablePadding sx={{ p: 1 }}>
            {sessions.map((session) => (
              <SessionNavItem key={session.id} item={session} />
            ))}
          </List>
        </Box>
      </Scrollbar>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      <Drawer
        open
        variant="permanent"
        PaperProps={{
          sx: {
            width: NAV_WIDTH,
            bgcolor: 'background.default',
            borderRightStyle: 'dashed',
          },
        }}
      >
        {renderContent}
      </Drawer>
    </Box>
  );
}

function renderIconStatus(status) {
  const set = {
    completed: { icon: 'pajamas:status-closed', color: 'green' },
    running: { icon: 'pajamas:status-closed', color: 'blue' },
    error: { icon: 'charm:circle-cross', color: 'red' },
    pending: { icon: 'pajamas:status-alert', color: 'yellow' },
  };
  return set[status] || {};
}
// ----------------------------------------------------------------------

SessionNavItem.propTypes = {
  item: PropTypes.object,
};

function SessionNavItem({ item }) {
  const {
    session_name: name,
    project,
    uuid: id,
    os,
    type,
    browser_name: browserName,
    browser_version: browserVersion,
    status,
    created_at: createdAt,
  } = item;
  const { color, icon } = renderIconStatus(status);
  return (
    <StyledNavItem
      component={RouterLink}
      to={`/sessions/${id}`}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>
        <Iconify icon={icon} sx={{ mr: 2, color }} />
      </StyledNavItemIcon>
      <Box>
        <Box>
          <Typography gutterBottom noWrap variant="span" align="left">
            {name}{' '}
          </Typography>
          <Typography gutterBottom variant="span" align="right">
            {project}{' '}
          </Typography>
        </Box>

        <Box>
          <Typography gutterBottom variant="span" align="right">
            {createdAt}
          </Typography>
        </Box>
        <Box>
          <Typography gutterBottom variant="span">
            {os} {browserName}-{browserVersion}
          </Typography>
        </Box>
      </Box>
      {/* <ListSubheader disableTypography primary={name}>{project} </ListSubheader> */}
    </StyledNavItem>
  );
}
