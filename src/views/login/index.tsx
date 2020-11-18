import React, { useState } from 'react';
import type { FC, FormEvent } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import './login.scss';

const initialLoginData = Object.freeze({
  name: '',
  password: '',
});

const Login: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState(initialLoginData);
  const hasError = false;

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (e: any) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
  };

  return (
    <div className="App-header">
      <h1 className="login-header">Vaadin CRM</h1>
      <div className="login-form-wrapper">
        <h2 className="form-title">Log in</h2>
        {hasError && (
          <Alert severity="error" className="form-alert">
            <AlertTitle>Incorrect username or password</AlertTitle>
            <p>
              Check that you have entered the correct username and password and
              try again.
            </p>
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            className="form-content"
            label="Username"
            onChange={handleChange}
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
            onChange={handleChange}
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
          <Button variant="contained" color="primary" fullWidth type="submit">
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
