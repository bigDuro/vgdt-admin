<?php namespace App\Models;

use CodeIgniter\Model;

class DriverModel extends Model
{
    protected $DBGroup = 'default';

    protected $table      = 'drivers';
    protected $primaryKey = 'id';

    protected $returnType     = 'array';
    // protected $useSoftDeletes = true;
    protected $allowedFields = [
      "name",
      "phone",
      "pay",
      "out"
    ];

    protected $useTimestamps = false;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    protected $validationRules    = [];
    protected $validationMessages = [];
    protected $skipValidation     = false;
}
