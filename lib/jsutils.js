export function generateDeviceIdentifiers({ count, lastMac = null, lastSerial = null, suffix = '', regionId = '' }) {
  const macList = [];
  const serialList = [];

  // Generate next MAC address
  const getNextMac = (mac, index) => {
    const start = mac ? mac.replace(/:/g, '') : '001A2B000000';
    const num = parseInt(start, 16) + index + 1;
    const hex = num.toString(16).padStart(12, '0').toUpperCase();
    return hex.match(/.{2}/g).join(':');
  };

  // Generate next Serial Number with suffix.region or date.region
  const getNextSerial = (serial, index) => {
    let startNum = 0;
    const sep = '.';

    if (suffix) {
      const prefix = `${suffix}${sep}${regionId}`;
      if (serial && serial.startsWith(prefix)) {
        const parts = serial.split(sep);
        if (parts.length === 3 && !isNaN(parts[2])) {
          startNum = parseInt(parts[2]);
        }
      }
      const serialNum = (startNum + index + 1).toString().padStart(4, '0');
      return `${suffix}${sep}${regionId}${sep}${serialNum}`;
    } else {
      const now = new Date();
      const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
      const prefix = `${datePart}${sep}${regionId}`;
      if (serial && serial.startsWith(prefix)) {
        const parts = serial.split(sep);
        if (parts.length === 3 && !isNaN(parts[2])) {
          startNum = parseInt(parts[2]);
        }
      }
      const serialNum = (startNum + index + 1).toString().padStart(4, '0');
      return `${datePart}${sep}${regionId}${sep}${serialNum}`;
    }
  };

  for (let i = 0; i < count; i++) {
    macList.push(getNextMac(lastMac, i));
    serialList.push(getNextSerial(lastSerial, i));
  }

  return { macIds: macList, serialNumbers: serialList };
}
