
export function generateDeviceIdentifiers({ count, lastMac = null, lastSerial = null }) {
    const macList = [];
    const serialList = [];
  
    // Generate next MAC address
    const getNextMac = (mac, index) => {
      const start = mac ? mac.replace(/:/g, '') : '001A2B000000';
      const num = parseInt(start, 16) + index + 1;
      const hex = num.toString(16).padStart(12, '0').toUpperCase();
      return hex.match(/.{2}/g).join(':');
    };
  
    // Generate next Serial Number
    const getNextSerial = (serial, index) => {
      const now = new Date();
      const datePart = now.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
      let startNum = 0;
  
      if (serial && serial.startsWith(datePart)) {
        startNum = parseInt(serial.split('-')[1]);
      }
  
      const serialNum = (startNum + index + 1).toString().padStart(4, '0');
      return `${datePart}-${serialNum}`;
    };
  
    for (let i = 0; i < count; i++) {
      macList.push(getNextMac(lastMac, i));
      serialList.push(getNextSerial(lastSerial, i));
    }
  
    return { macIds: macList, serialNumbers: serialList };
  }
  