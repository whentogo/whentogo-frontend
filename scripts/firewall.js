const axios = require('axios');
const url = require('url');

const doUrl = "https://api.digitalocean.com/v2/";
const ADD_ACTION = 'add';
const REMOVE_ACTION = 'remove';

const args = process.argv.slice(2);

if (args.length !== 4) {
  console.error('insufficient arguments');
  process.exit(1);
}

const action = args[0];
const droplet = args[1];
const firewall = args[2];
const token = args[3];

if (!token || !firewall || !droplet || !action) {
  console.error('invalid arguments');
  process.exit(1);
}

if (action !== ADD_ACTION && action !== REMOVE_ACTION) {
  console.error('action not recognized');
  process.exit(1);
}

const http = axios.create({
  baseURL: doUrl,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
})

function normalizedTrim(string) {
  return string.trim().toLocaleLowerCase();
}

async function getFirewall(firewallName) {
  const cleaned = normalizedTrim(firewallName);
  const res = await http.get('firewalls')
    .then(res => res.data);

  const firewalls = Array.isArray(res.firewalls) ? res.firewalls : [];
  
  return firewalls.find(fw => cleaned === normalizedTrim(fw.name));
}

async function getDroplet(dropletName) {
  const cleaned = normalizedTrim(dropletName);
  const res = await http.get('droplets')
    .then(res => res.data);
  
  const droplets = Array.isArray(res.droplets) ? res.droplets : [];

  return droplets.find(dl => cleaned === normalizedTrim(dl.name));
}

async function executeScript(firewallName, dropletName) {
  const results = await Promise.all([
    getFirewall(firewallName),
    getDroplet(dropletName),
  ]);

  const firewallObj = results[0];
  const dropletObj = results[1];

  if (!firewallObj || !dropletObj) {
    console.error('droplet or firewall does not exist');
    process.exit(1);
  }

  const payload = { droplet_ids: [dropletObj.id] };

  if (action === ADD_ACTION) {
    await http.post(`firewalls/${firewallObj.id}/droplets`, payload);
  } else {
    await http.delete(`firewalls/${firewallObj.id}/droplets`, { data: payload });
  }

  console.log(`droplet successfully ${action === ADD_ACTION ? 'added to' : 'removed from'} firewall`);
}
  
executeScript(firewall, droplet);
