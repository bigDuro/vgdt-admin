<?php namespace App\Models;

use CodeIgniter\Model;

class WebHooksModel extends Model
{
    protected $DBGroup = 'default';

    protected $table      = 'webHooks';
    protected $primaryKey = 'id';

    protected $returnType     = 'array';
    // protected $useSoftDeletes = true;
    protected $allowedFields = [
      'url',
      'icon',
      'logo',
      'type',
      'appUrl',
      'channel',
      'active',
      'status'
    ];

    protected $useTimestamps = false;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    protected $validationRules    = [];
    protected $validationMessages = [];
    protected $skipValidation     = false;
}
