import React, { useState } from 'react';
import type { FC } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import './login.scss';

const Login: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="App-header">
      <h1 className="login-header">Vaadin CRM</h1>
      <div className="login-form-wrapper">
        <h2 className="form-title">Log in</h2>
        <form>
          <TextField
            name="username"
            className="form-content"
            label="Username"
            variant="outlined"
            size="small"
            fullWidth
            required
          />
          <TextField
            name="password"
            className="form-content"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            variant="outlined"
            size="small"
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" color="primary" fullWidth>
            Log in
          </Button>
        </form>
      </div>
      <a className="forgot-password">Forgot password</a>
      <div className="login-info">
        <p>
          Log in with user:
          <b> user </b>
          and password:
          <b> password.</b>
        </p>
        The database in this demo is reset every few hours.
      </div>
    </div>
  );
};

export default Login;
