<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $table = 'vehicles';
    protected $primaryKey = 'id';

    use HasFactory;
    protected $fillable = ['id', 'total_time', 'month_payment', 'user_id', 'vehicle_type_id'];
}
