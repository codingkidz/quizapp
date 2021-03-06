import { Buffer } from "buffer";

type ROLES = "STUDENT" | "TEACHER" | "ADMIN";

interface TokenContents {
  id: number;
  email: string;
  roles: ROLES[];
  iat: number;
  exp: number;
}

const readToken = (token: string) => {
  try {
    return JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    ) as TokenContents;
  } catch (error) {
    throw new Error(error);
  }
};

const isTokenExpired = (token: string) => {
  const decodedToken = readToken(token);

  // token exp time is measured in seconds not milliseconds
  const currentTimeInUnixSeconds = Math.floor(Date.now() / 1000);

  return Number(decodedToken.exp) < currentTimeInUnixSeconds;
};

// const storeRefreshTokenInStorage = async (token: string) => {
//   try {
//     return await AsyncStorage.setItem('@refreshToken', token);
//   } catch (error) {
//     throw new Error(`AsyncStorage Error: ${error.message}`);
//   }
// };

// const getRefreshTokenFromStorage = async () => {
//   try {
//     const storedRefreshToken = await AsyncStorage.getItem('@refreshToken');
//     if (storedRefreshToken) {
//       return storedRefreshToken;
//     } else {
//     }
//   } catch (error) {
//     throw new Error(`AsyncStorage Error: ${error}`);
//   }
// };

// const removeRefreshTokenFromStorage = async () => {
//   try {
//     return await AsyncStorage.removeItem('@refreshToken');
//   } catch (error) {
//     throw new Error(`AsyncStorage Error: ${error}`);
//   }
// };

const TokenService = {
  readToken,
  isTokenExpired,
  // storeRefreshTokenInStorage,
  // getRefreshTokenFromStorage,
  // removeRefreshTokenFromStorage,
};

export default TokenService;
