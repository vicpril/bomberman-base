const path = require('path');

export const IS_DEV = process.env.NODE_ENV !== 'production';
export const SRC_DIR = path.join(__dirname, '..', 'src');
export const DIST_DIR = path.join(__dirname, '..', 'dist');
export const SERVER_OUT_DIR = path.join(__dirname, '..', 'distServer');
