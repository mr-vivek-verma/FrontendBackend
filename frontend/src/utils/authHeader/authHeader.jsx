const authHeader = (thunkAPI) => {
  return {
    headers: {
      'X-Auth-Token':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoia2FqYWxAeW9wbWFpbC5jb20iLCJ1c2VyVHlwZSI6IkFkbWluIiwiaWF0IjoxNjcxMjk4MDM5fQ.PFCriGaCsFKbvBTlkbE8n772HVCg0aXyWO3EqgGI_W4',
    },
  };
};

export default authHeader;
