import PropTypes from 'prop-types';
import { useEffect } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Box, ListItemText, List, Drawer, IconButton, Toolbar, Divider } from '@mui/material';
// mock
import sessions from '../../../_mock/sessions';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
//
import { StyledNavItem, StyledNavItemIcon } from '../../../components/nav-section/styles';

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

export default function SessionNav({ onOpenNav , ...other}) {
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

// ----------------------------------------------------------------------

SessionNavItem.propTypes = {
  item: PropTypes.object,
};

function SessionNavItem({ item }) {
  const { name, project, id } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={`/dashboard/app/${id}`}
      sx={{
        '&.active': {
          color: 'text.primary !important',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon><Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} /></StyledNavItemIcon>
      <ListItemText disableTypography primary={name} secondary={project} />
      <p>OS</p>
      <p>Browser/App</p>
      <p>Status</p>
      {/* <ListSubheader disableTypography primary={name}>{project} </ListSubheader> */}
    </StyledNavItem>
  );
}
