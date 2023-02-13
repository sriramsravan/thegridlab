import { TextField } from '@mui/material';
import { useState } from 'react';

const ValidateTextField = (props) => {
  const { regex, errorMessage } = props;
  const [error, setError] = useState(null);

  const validate = (e) => {
    if (!regex.test(e.target.value)) {
      setError(errorMessage);
    } else {
      setError(null);
    }
  };

  return (
    <TextField
      variant="outlined"
      onBlur={validate}
      error={error !== null}
      helperText={error}
      {...props}
    />
  );
};

export default ValidateTextField;