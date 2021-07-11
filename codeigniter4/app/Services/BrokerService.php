<?php namespace App\Services;
use App\Models\BrokerModel;

// Get Broker info takes connection and sql query
class BrokerService extends BaseService {
  function __construct()
   {
     $model = new BrokerModel();
     parent::__construct($model);
   }

   public function getRecords()
   {
     $model = new BrokerModel();
     $records = $model->orderBy('name', 'ASC')->findAll();
     return $records;
   }

}
