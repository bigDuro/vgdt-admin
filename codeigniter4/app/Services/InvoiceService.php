<?php namespace App\Services;
use App\Models\InvoiceModel;

// Get Invoice info takes connection and sql query
class InvoiceService extends BaseService {
  function __construct()
   {
     $model = new InvoiceModel();
     parent::__construct($model);
   }

   public function getRecords()
   {
     $model = new InvoiceModel();
     $records = $model->orderBy('id', 'DESC')->findAll();
     return $records;
   }

}
