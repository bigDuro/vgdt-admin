<?php namespace App\Controllers;
use App\Services\BrokerService;

class Brokers extends BaseApiController
{
	function __construct()
   {
     $service = new BrokerService();
     parent::__construct($service);
   }

	public function getByIds()
	{
		$Service = new BrokerService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();
		$json = $request->getJSON();

		switch ($method) {
				case 'post':
						$record = $Service->getRecord($json);
						return $response->setJSON($record);
						break;
				default:
						echo "nothing here!";
		}
	}


}
