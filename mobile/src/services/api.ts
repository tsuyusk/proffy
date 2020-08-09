import axios from 'axios';

/**
 * Read all instructions below!
 *
 * Replace ipv4 by your ipv4! You can find it pressing Windows + R, typing 'cmd', typing 'ipconfig', and searching for 'ipv4 address'.
 */

const ipv4 = '192.168.0.10';

const api = axios.create({
  baseURL: `http://${ipv4}:3333`,
});

export default api;
