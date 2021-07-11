<?php namespace App\Services;
use App\Models\EmployeeModel;

// Get Employee info takes connection and sql query
class EmployeeService extends BaseService {
  function __construct()
   {
     $model = new EmployeeModel();
     parent::__construct($model);
   }
}
