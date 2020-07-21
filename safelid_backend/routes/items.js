const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const isEmpty = require('is-empty');
const auth = require('../middleware/auth');

const User = require('../models/user_model');