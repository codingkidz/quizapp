import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AppThunk} from './store';

import axios, {AxiosError} from 'axios';
import {
  removeRefreshTokenFromStorage,
  Roles,
  storeRefreshTokenInStorage,
} from '../utils';

interface StateType {
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: StateType = {
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

const login = createAsyncThunk(
  'user/login',
  async ({email, password}: {email: string; password: string}, thunkAPI) => {
    return await axios
      .post('http://localhost:8000/api/auth/login', {
        email: email,
        password: password,
      })
      .then(
        async (response) => {
          await storeRefreshTokenInStorage(response.data.refresh_token);

          return {
            accessToken: String(response.data.access_token),
            refreshToken: String(response.data.refresh_token),
          };
        },
        (error: AxiosError) => {
          return thunkAPI.rejectWithValue(error);
        },
      );
  },
);

const register = createAsyncThunk<
  {accessToken: string; refreshToken: string},
  {email: string; password: string; role: Roles},
  {
    rejectValue: string;
  }
>(
  'user/register',
  async (
    {email, password, role}: {email: string; password: string; role: Roles},
    thunkAPI,
  ) => {
    return await axios
      .post('http://localhost:8000/api/auth/signup', {
        email: email,
        password: password,
        role: role,
      })
      .then(
        async (response) => {
          await storeRefreshTokenInStorage(response.data.refresh_token);

          return {
            accessToken: String(response.data.access_token),
            refreshToken: String(response.data.refresh_token),
          };
        },
        (error) => {
          // Request was made and server responded with a non 200 status code
          if (error.response) {
            switch (error.response.status) {
              case 409:
                return thunkAPI.rejectWithValue(error.response.data.message);
              default:
                return thunkAPI.rejectWithValue('Error occured during signup');
            }
            // Request was made but no response was received
          } else if (error.request) {
            return thunkAPI.rejectWithValue('No response received');
            // Other error
          } else {
            return thunkAPI.rejectWithValue(String(error));
          }
        },
      );
  },
);

const refreshTokens = createAsyncThunk(
  'user/refreshTokens',
  async (refreshToken: string, _thunkAPI) => {
    return await axios
      .get('http://localhost:8000/api/auth/refresh_token', {
        headers: {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      })
      .then((response) => {
        storeRefreshTokenInStorage(response.data.refresh_token);

        return {
          accessToken: String(response.data.access_token),
          refreshToken: String(response.data.refresh_token),
        };
      });
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    logout: (state) => {
      removeRefreshTokenFromStorage();
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, _action) => {
      (state.accessToken = null),
        (state.refreshToken = null),
        (state.error = null),
        (state.loading = true);
    });

    builder.addCase(login.fulfilled, (state, action) => {
      (state.accessToken = action.payload.accessToken),
        (state.refreshToken = action.payload.refreshToken),
        (state.error = null),
        (state.loading = false);
    });

    builder.addCase(login.rejected, (state, action) => {
      (state.accessToken = null),
        (state.refreshToken = null),
        (state.error = action.error.message ?? 'Unknown login error'),
        (state.loading = false);
    });

    builder.addCase(register.pending, (state, _action) => {
      (state.accessToken = null),
        (state.refreshToken = null),
        (state.error = null),
        (state.loading = true);
    });

    builder.addCase(register.fulfilled, (state, action) => {
      (state.accessToken = action.payload.accessToken),
        (state.refreshToken = action.payload.refreshToken),
        (state.error = null),
        (state.loading = false);
    });

    builder.addCase(register.rejected, (state, action) => {
      (state.accessToken = null),
        (state.refreshToken = null),
        (state.error = action.error.message ?? 'Unknown registration error'),
        (state.loading = false);
    });

    builder.addCase(refreshTokens.pending, (state, _action) => {
      (state.accessToken = null),
        (state.refreshToken = null),
        (state.error = null),
        (state.loading = true);
    });

    builder.addCase(refreshTokens.fulfilled, (state, action) => {
      (state.accessToken = action.payload.accessToken),
        (state.refreshToken = action.payload.refreshToken),
        (state.error = null),
        (state.loading = false);
    });

    builder.addCase(refreshTokens.rejected, (state, action) => {
      (state.accessToken = null),
        (state.refreshToken = null),
        (state.error = action.error.message ?? 'Unknown registration error'),
        (state.loading = false);
    });
  },
});

export const {logout, setRefreshToken} = userSlice.actions;
export default userSlice.reducer;
export {login, register, refreshTokens};