<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VehicleType;

class VehiclesTypeController extends Controller
{
    public function index()
    {
        $vehicles_type = VehicleType::all();
        // return Response()->json($vehicles_type);
        return $vehicles_type;
    }
}
