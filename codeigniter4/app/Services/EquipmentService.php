<?php namespace App\Services;
use App\Models\EquipmentModel;

// Get Equipment info takes connection and sql query
class EquipmentService extends BaseService {
  function __construct()
   {
     $model = new EquipmentModel();
     parent::__construct($model);
   }
}
