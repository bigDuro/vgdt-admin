<?php namespace App\Services;
use App\Models\LoadModel;
use CodeIgniter\I18n\Time;

// Get Load info takes connection and sql query
class LoadService extends BaseService {
  function __construct()
   {
     $model = new LoadModel();
     parent::__construct($model);
   }

   public function getRecords()
   {
     $model = new LoadModel();
     $records = $model->orderBy('dropoffDate', 'DESC')->findAll();
     return $records;
   }


   public function getRecordByDate()
   {
     // $model = new LoadModel();
     $date = Time::createFromDate(2021, 1, 1);
     $model = new LoadModel();
     $records = $model->orderBy('id', 'DESC')->findAll();

     // $userModel->where('pickupDate', 1)->findAll();
     // echo "string";
     return $date;
   }

   public function getRecordByKeyValue($type, $id)
   {
     $model = new LoadModel();
     $record = $model->where($type, $id)->orderBy('dropoffDate', 'asc')
                   ->findAll();
     return $record;
   }
}
