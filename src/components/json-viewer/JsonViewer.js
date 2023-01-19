import React, { useState } from 'react';

import { Paper, Typography, Button, Collapse, List, ListItem, ListItemText } from '@mui/material';

function JsonViewer({ data, title = 'JSON' }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const renderJson = (json, key = '') => {
    if (json === null) {
      return <Typography variant="body2">null</Typography>;
    }
    if (typeof json === 'boolean') {
      return <Typography variant="body2">{json ? 'true' : 'false'}</Typography>;
    }
    if (typeof json === 'number') {
      return <Typography variant="body2">{json}</Typography>;
    }
    if (typeof json === 'string') {
      return <Typography variant="body2">"{json}"</Typography>;
    }
    if (Array.isArray(json)) {
      return (
        <List>
          {json.map((item, index) => (
            <ListItem key={`${key}.${index}`}>
              <ListItemText>{renderJson(item, `${key}.${index}`)}</ListItemText>
            </ListItem>
          ))}
        </List>
      );
    }
    if (typeof json === 'object') {
      return (
        <List>
          {Object.keys(json).map((k) => (
            <ListItem key={`${key}.${k}`}>
              <ListItemText>
                <Typography variant="body2">{k}: </Typography>
                {renderJson(json[k], `${key}.${k}`)}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      );
    }
    return <></>;
  };

  return (
    <>
      <Button onClick={handleClick}>
        {open ? 'Hide' : 'Show'} {title}
      </Button>
      <Collapse in={open}>
        <Paper>{renderJson(data)}</Paper>
      </Collapse>
    </>
  );
}

export default JsonViewer;
