import { getEnv } from '../config';
import { INVOICE_DATES } from '../constants/';

const env = getEnv('local'); // local or prod

export const get = async (type) => {
  const response = await fetch(`${env}/${type}`)
  const json = await response.json();
  return json;
}

export const getType = async (table, type) => {
  const response = await fetch(`${env}/${table}/type/${type}`)
  const json = await response.json();
  return json;
}


export const getByID = async (type, id) => {
  const response = await fetch(`${env}/${type}/id/${id}`);
  const json = await response.json();
  return json;
}

export const save = async (type, item) => {
  const response = await fetch(`${env}/${type}`, {
    method: 'post',
    body: JSON.stringify(item)
  })
  const json = await response.json();
  if(json.id) {
    return json;
  }else {
    return json[json.length - 1]
  }
}


export const deleteById = async (type, id) => {
  const response = await fetch(`${env}/${type}/delete/${id}`, {
    method: 'post'
  });
  const json = await response.json();
  return json;
}

const formatItems = (items) => {
  const records = INVOICE_DATES.map(field => {
    return items.map(item => {
      item[field] = new Date(item[field]).toLocaleDateString()
      return item;
    })
  })
  return records[0];
}

export const exportToCSV = async (type, items) => {
  const records = formatItems(items);
  const body = JSON.stringify(records);
  // console.log('body: ', body);
  const response = await fetch(`${env}/utils/export`, {
    method: 'post',
    body
  })
  const csv = await response.text()
  .then(text => {
    window.open("data:text/csv;charset=utf-8," + escape(text), true)
  });
  return csv;
}

export const uploadAssets = async (file) => {

  // const uploadAssetsPromise = new Promise((resolve, reject) => {
  const formData = new FormData();
  formData.append('file', file);

  console.log('uploadAssets:: ', formData);

  const response = await fetch(`${env}/utils/upload/31`, {
    method: 'POST',
    body: formData,
  })

  const json = await response.json();
  return json;
}
