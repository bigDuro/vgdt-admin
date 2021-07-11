<?php namespace App\Services;
use App\Models\UserModel;

// Get User info takes connection and sql query
class UserService extends BaseService {
  function __construct()
   {
     $model = new UserModel();
     parent::__construct($model);
   }
}
