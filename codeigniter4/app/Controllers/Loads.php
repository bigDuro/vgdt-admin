<?php namespace App\Controllers;
use App\Services\LoadService;

class Loads extends BaseApiController
{
	function __construct()
   {
     $service = new LoadService();
     parent::__construct($service);
   }

	public function getRecordByDate()
	{
		$Service = new LoadService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();

		switch ($method) {
				case 'get':
						$record = $Service->getRecordByDate();
						return $response->setJSON($record);
						break;
				default:
						echo "nothing here!";
		}
	}

	public function getLoadsByKeyValue($type, $id)
	{
		$Service = new LoadService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();

		switch ($method) {
				case 'get':
						$record = $Service->getRecordByKeyValue($type, $id);
						return $response->setJSON($record);
						break;
				default:
						echo "nothing here!";
		}
	}

}
