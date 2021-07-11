<?php namespace App\Services;

// Get Base info takes connection and sql query
class BaseService {
  function __construct($model)
   {
     $this->model = $model;
   }

   public function getRecords()
   {
     // $model = new BaseModel();
     $records = $this->model->findAll();
     return $records;
   }

   public function saveRecord($data)
   {
     // $model = new BaseModel();
     $this->model->save($data);
     $record = $this->model->find($data);
     return $record;
   }

   public function getRecord($record_id)
   {
     // $model = new BaseModel();
     $record = $this->model->find($record_id);
     return $record;
   }

   public function deleteRecordById($record_id)
   {
     // $model = new BaseModel();
     $record = $this->model->find($record_id);
     $this->model->delete([$record_id]);

     return $record;
   }

   public function getRecordWithAttrs($attr)
   {
     // $model = new EmployeeModel();
     $records = $this->model->where('position', $attr)->findAll();
     return $records;
   }
}
