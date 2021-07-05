import React from 'react';

import { useDispatch } from "react-redux";
import { logout, updateAccessToken } from "../slices/auth";

export const TokensExpired = () => (useDispatch(logout()))
export const UpdateToken = (payload) => (useDispatch(updateAccessToken(payload)))