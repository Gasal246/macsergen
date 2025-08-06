"use client"
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

interface ModuleData {
  model_number: string;
  telx_model_number: string;
  suffix: string;
  description: string;
  chipset: string;
  type: string;
  mac_allocated: string;
  sn_allocated: string;
  [key: string]: any;
}

interface MacAddress {
  mac_address: string;
  used: boolean;
  [key: string]: any;
}

interface SerialNumber {
  serial_number: string;
  used: boolean;
  [key: string]: any;
}

export async function generateExcel(
  module_data: ModuleData,
  mac_addresses: MacAddress[],
  serial_numbers: SerialNumber[]
) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Module Data');

  // Row 1 - Headers
  sheet.addRow([
    'Model Number',
    'TelX Model No',
    'Suffix',
    'Description',
    'Chipset',
    'Type',
    'Mac Allocation',
    'Serial Allocation',
  ]);

  // Row 2 - Values
  sheet.addRow([
    module_data.model_number,
    module_data.telx_model_number, // TelX Model No same as model_number in screenshot
    module_data.suffix,
    module_data.description,
    module_data.chipset,
    module_data.type,
    module_data.mac_allocated,
    module_data.sn_allocated,
  ]);

  sheet.addRow([]); // Empty row for spacing

  // MAC & Serial table headers
  sheet.addRow(['MAC IDs', 'Allocation', 'Serial Numbers', 'Allocation']);

  // Populate rows
  const maxRows = Math.max(mac_addresses.length, serial_numbers.length);
  for (let i = 0; i < maxRows; i++) {
    sheet.addRow([
      mac_addresses[i]?.mac_address || '',
      mac_addresses[i]?.used ? 'used' : '-',
      serial_numbers[i]?.serial_number || '',
      serial_numbers[i]?.used ? 'used' : '-',
    ]);
  }

  // Adjust column widths
  sheet.columns.forEach((col) => {
    col.width = 20;
  });

  // Export to browser
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), `${module_data.model_number}.xlsx`);
}
