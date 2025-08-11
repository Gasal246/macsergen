export function generateDeviceIdentifiers({ count, lastMac = null, lastSerial = null, suffix = '', regionId = '' }) {
  const macList = [];
  const serialList = [];

  // Generate next MAC address starting from 0C:7F:ED:B0:00:00
  const getNextMac = (mac, index) => {
    const start = mac ? mac.replace(/:/g, '') : '0C7FEDB00000';
    const num = parseInt(start, 16) + index + 1;
    const hex = num.toString(16).padStart(12, '0').toUpperCase();
    return hex.match(/.{2}/g).join(':');
  };

  // Generate next Serial Number with suffix.region or date.region
  const getNextSerial = (serial, index) => {
    const cleanSuffix = suffix.replace(/[^A-Za-z0-9]/g, ''); // remove non-alphanumeric
    const yearPart = new Date().getFullYear().toString().slice(-2); // e.g. "25"
    let startNum = 0;
  
    const prefix = `${cleanSuffix}${regionId}${yearPart}`;
    if (serial && serial.startsWith(prefix)) {
      const numPart = serial.slice(prefix.length);
      if (!isNaN(numPart)) {
        startNum = parseInt(numPart);
      }
    }
  
    const serialNum = (startNum + index + 1).toString().padStart(5, '0');
    return `${cleanSuffix}${regionId}${yearPart}${serialNum}`;
  };

  for (let i = 0; i < count; i++) {
    macList.push(getNextMac(lastMac, i));
    serialList.push(getNextSerial(lastSerial, i));
  }

  return { macIds: macList, serialNumbers: serialList };
}
