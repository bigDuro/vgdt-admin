<?php namespace App\Controllers;
use App\Services\DiscordService;




class Discord extends BaseController
{
	public function index()
	{
    $Service = new DiscordService();
    $request = $this->request;
    $response = $this->response;
    $method = $request->getMethod();
    $json = $request->getJSON();

    switch ($method) {
        case 'post':
            echo "nothing here!";
            break;
        case 'get':
            return view('index');
            break;
        default:
            echo "nothing here!";
    }


	}

  public function dispatch()
	{
    $Service = new DiscordService();
    $request = $this->request;
    $response = $this->response;
    $method = $request->getMethod();
    $json = $request->getJSON();

    switch ($method) {
        case 'post':
            $Service->postToDiscordDispatch($json);
            return $response->setJSON($json);
            break;
        case 'get':
            return view('index');
            break;
        default:
            echo "nothing here!";
    }


	}

}
