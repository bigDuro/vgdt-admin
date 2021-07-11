<?php namespace App\Services;
use App\Models\UploadModel;

// Get Upload info takes connection and sql query
class UploadService extends BaseService {
  function __construct()
   {
     $model = new UploadModel();
     parent::__construct($model);
   }
}
