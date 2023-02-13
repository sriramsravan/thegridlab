import { Outlet, Link } from 'react-router-dom';
import { Grid, List, ListItem, ListItemText, styled, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import Header from './header';
import Nav from './nav';
import buildService from '../../services/build.service';
import Scrollbar from '../../components/scrollbar';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default function BuildLayout() {
  const [open, setOpen] = useState(false);
  const [builds, setBuilds] = useState([]);

  useEffect(() => {
    buildService.getBuilds().then((_builds) => {
      setBuilds(_builds);
    });
  }, []);
  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />
      <Main>
        <Grid container>
          <Grid item xs={3}>
            <Scrollbar>
              <List>
                {builds.map((build) => (
                  <ListItem key={build.uuid}>
                    <Link to={`/builds/${build.uuid}/sessions`}>
                      <ListItemText>
                        <Typography variant="h5">{build.name}</Typography>
                        <Typography>{build.passedTests} passed tests</Typography>
                        <Typography>{build.timeAgo} ago</Typography>
                      </ListItemText>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Scrollbar>
          </Grid>
          <Grid item xs={9}>
            <Outlet />
          </Grid>
        </Grid>
      </Main>
    </StyledRoot>
  );
}
