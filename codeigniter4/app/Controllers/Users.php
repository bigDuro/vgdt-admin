<?php namespace App\Controllers;
use App\Services\UserService;

class Users extends BaseApiController
{
	function __construct()
   {
     $service = new UserService();
     parent::__construct($service);
   }

}
