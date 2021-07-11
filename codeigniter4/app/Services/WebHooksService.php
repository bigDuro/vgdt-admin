<?php namespace App\Services;
use App\Models\WebHooksModel;

// Get WebHooks info takes connection and sql query
class WebHooksService extends BaseService {
  function __construct()
   {
     $model = new WebHooksModel();
     parent::__construct($model);
   }
}
