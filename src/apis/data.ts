const InitialData = {
  domain: "",
  installPath: "",
  packagePath: "",
  username: "",
  password: "",
  nodes: [
    {
      hostname: "node1",
      networks: [
        {
          interface: "eth0",
          ip: "",
          netmask: "24",
          gateway: "",
        },
      ],
    },
  ],
  oracleConnect: [
    {
      hostname: "scan",
      port: 1521,
      serviceName: "d5000",
      username: "",
      password: "",
    },
    {
      hostname: "scan1",
      port: 1521,
      serviceName: "d5000",
      username: "",
      password: "",
    },
  ],
  oracleClient: {
    installPath: "",
    packagePath: "",
  },
  qt: {
    installPath: "",
    packagePath: "",
  },
};

export default InitialData;
