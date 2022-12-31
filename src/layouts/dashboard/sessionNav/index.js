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
  const { sessionName: name, project, id, status } = item;
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
            Date
          </Typography>
        </Box>
        <Box>
          <Typography gutterBottom variant="span">
            OS{' '}
          </Typography>
          <Typography gutterBottom variant="span" align={'left'}>
            Browser / App{' '}
          </Typography>
          <Typography gutterBottom variant="span">
            {status}
          </Typography>
        </Box>
      </Box>
      {/* <ListSubheader disableTypography primary={name}>{project} </ListSubheader> */}
    </StyledNavItem>
  );
}
