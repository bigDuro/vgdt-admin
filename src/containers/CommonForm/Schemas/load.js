import { getTodayAndTommorrowDates } from '../../../utils/adjustDates';
const { today, tomorrow } = getTodayAndTommorrowDates();

export const LoadJSONSchema = {
  "title": "Load Details",
  "description": "",
  "type": "object",
  "required": [
    "type",
    "status",
    "pickupDate",
    "dropoffDate",
    "pickupLocation",
    "dropoffLocation",
    "loadedMiles",
    "deadHead",
    "rate",
    "user",
    "driver",
    "broker"
  ],
  "properties": {
    "user": {
      "title": "Dispatch",
      "type": "string",
      "enum": [],
      "enumNames": [],
      "default": ""
    },
    "status": {
      "title": "Status",
      "type": "string",
      "enum": [
        "Planning",
        "Scheduled",
        "Live",
        "Completed",
        "Billed"
      ],
      "enumNames": [
        "Planning",
        "Scheduled",
        "Live",
        "Completed",
        "Billed"
      ],
      "default": "Planning"
    },
    "type": {
      "title": "Type",
      "type": "string",
      "enum": [
        "PO",
        "Van",
        "Reefer"
      ],
      "enumNames": [
        "PO",
        "Van",
        "Reefer"
      ],
      "default": "Van"
    },
    "broker": {
      "title": "Broker",
      "type": "string",
      "enum": ["addNew"],
      "enumNames": ["Add New"],
      "default": ""
    },
    "pickupLocation": {
      "type": "string",
      "title": "Origin",
      "description": "Pickup Location",
      "default": ""
    },
    "pickupDate": {
      "title": "Pickup",
      "type": "string",
      "format": "date-time",
      "default": ""
    },
    "dropoffLocation": {
      "type": "string",
      "title": "Destination",
      "default": ""
    },
    "dropoffDate": {
      "title": "Dropoff",
      "type": "string",
      "format": "date-time",
      "default": ""
    },
    "deadHead": {
      "title": "DeadHead",
      "type": "number",
      "default": 0
    },
    "loadedMiles": {
      "title": "Loaded Miles",
      "type": "number",
      "default": 500
    },
    "rate": {
      "title": "Rate",
      "type": "number",
      "default": 1500
    },
    "weight": {
      "title": "Weight",
      "type": "number",
      "default": ""
    },
    "cargo": {
      "title": "Cargo",
      "type": "string",
      "default": ""
    },
    "driver": {
      "title": "Driver",
      "type": "string",
      "enum": [],
      "enumNames": [],
      "default": ""
    },
    "tractor": {
      "title": "Tractor",
      "type": "string",
      "enum": [],
      "enumNames": [],
      "default": ""
    },
    "trailer": {
      "title": "Trailer",
      "type": "string",
      "enum": [],
      "enumNames": [],
      "default": ""
    },
    "detentionPay": {
      "title": "Detention hrs",
      "type": "number",
      "default": 0
    },
    "layoverPay": {
      "title": "Layover hrs",
      "type": "number",
      "default": 0
    },
    "lumper": {
      "title": "Lumper Fee",
      "type": "number",
      "default": 0
    },
    "loadNumber": {
      "title": "Load#",
      "type": "string",
      "default": ""
    },
    "notes": {
      "title": "Notes",
      "type": "string",
      "default": ""
    },
    "tonu": {
      "type": "boolean",
      "title": "TONU",
      "default": "false"
    },
    "ratecon": {
      "type": "string",
      "title": "Rate Contract",
      "default": ""
    },
    "files": {
      "type": "array",
      "title": "Upload Ratecon",
      "items": {
        "type": "string",
        "format": "data-url"
      }
    },
  }
}

export const LoadFormData = {
  "user": "select",
  "status": "Planning",
  "type": "Van",
  "broker": "addNew",
  "pickupLocation": "",
  "pickupDate": today,
  "dropoffLocation": "",
  "dropoffDate": tomorrow,
  "deadHead": 0,
  "loadedMiles": 500,
  "rate": 1500,
  "weight": "",
  "cargo": "",
  "driver": "1",
  "tractor": "1",
  "trailer": "2",
  "detentionPay": 0,
  "layoverPay": 0,
  "lumper": 0,
  "loadNumber": "",
  "notes": "",
  "tonu": "false",
  "ratecon": ""
};

export const LoadUISchema = {}
