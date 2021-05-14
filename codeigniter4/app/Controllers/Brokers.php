<?php namespace App\Controllers;
use App\Services\BrokerService;

class Brokers extends BaseController
{
	public function index()
	{
		$Service = new BrokerService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();
		$json = $request->getJSON();

		switch ($method) {
		    case 'post':
						$record = $Service->saveRecord($json);
						return $response->setJSON($record);
		        break;
		    case 'get':
						$records = $Service->getRecords();
						return $response->setJSON($records);
		        break;
		    default:
		        echo "nothing here!";
		}
	}

	public function id($id)
	{
		$Service = new BrokerService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();
		$json = $request->getJSON();

		switch ($method) {
		    case 'get':
						$record = $Service->getRecord($id);
						return $response->setJSON($record);
		        break;
		    default:
		        echo "nothing here!";
		}
	}

	public function delete($id)
	{
		$Service = new BrokerService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();

		switch ($method) {
				case 'post':
						$record = $Service->deleteRecordById($id);
						return $response->setJSON($record);
						break;
				default:
						echo "nothing here!";
		}
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
