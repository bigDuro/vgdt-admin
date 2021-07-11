<?php namespace App\Controllers;
use App\Services\EmployeeService;

class Employees extends BaseApiController
{
	function __construct()
   {
     $service = new EmployeeService();
     parent::__construct($service);
   }

}
