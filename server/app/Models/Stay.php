<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stay extends Model
{
    protected $table = 'stay';
    
    use HasFactory;
    protected $fillable = ['entry_time', 'exit_time', 'time', 'payment', 'vehicle_type', 'vehicle_id'];
}
