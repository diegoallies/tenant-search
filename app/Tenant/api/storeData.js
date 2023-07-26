import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed!' });
  }

  const { id, selectedData } = req.body;

  const dataDirectory = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDirectory)) {
     fs.mkdirSync(dataDirectory);
  }

  const filePath = path.join(dataDirectory, 'data.json');

  let data = [];
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    data = JSON.parse(fileData);
  }

  const index = data.findIndex(dataItem => dataItem.id === id);
  
  if (index > -1) data[index].selectedData = selectedData;
  else data.push({ id, selectedData });
  
  fs.writeFileSync(filePath, JSON.stringify(data));

  return res.status(200).json({ message: 'Data has been successfully stored' });
}