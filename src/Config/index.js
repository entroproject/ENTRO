import axios from 'axios'

const Config = axios.create({
  url: "https://13.126.15.56:280/api/",
  headers:{
    'Content-type': "application/json",
    token: "Q8TAIKBKBAKSRNQH9QQPFTKDGIV9RCCOOX"
  }
});

export default Config;
