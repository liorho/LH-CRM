export const toUpperCase = (input) => {
  return input
    .split(' ')
    .map((i) => i.charAt(0).toUpperCase() + i.slice(1))
    .join(' ');
};

export const clientDetailsToUpperCase = (client) => {
  client.country = toUpperCase(client.country);
  client.name = toUpperCase(client.name);
  client.owner = toUpperCase(client.owner);
  return client;
};
