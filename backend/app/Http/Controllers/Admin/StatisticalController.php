<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StatisticalController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin');
        $this->middleware('modify.response');
    }
    
    public function showStatisticalOrder(Request $request)
    {
        $rules = [
            'type' => 'required|string',
            'year' => 'required|integer',
            'num_month' => 'required|integer',
            'month_start' => 'required|integer|min:1|max:12',
            'month_end' => 'required|integer|min:1|max:12',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $type = $request['type'];
        $year = $request['year'];
        $monthStart = $request['month_start'];
        $monthEnd = $request['month_end'];

        $orders = Order::whereYear('created_at', $year)
            ->whereMonth('created_at', '>=', $monthStart)
            ->whereMonth('created_at', '<=', $monthEnd)
            ->get()
            ->groupBy(function ($date) { 
                return Carbon::parse($date->created_at)->format('m');
            });

        $statistical = [];

        if ($type === 'order') {
            foreach ($orders as $month => $orderGroup) { 
                $totalOrder = $orderGroup->count();
                $statistical[] = [ 
                    'month' => $month, 
                    'value' => $totalOrder,
                ]; 
            }
        } else if ($type === 'revenue') {
            foreach ($orders as $month => $orderGroup) { 
                $totalValue = $orderGroup->sum('total_amount'); 
                $statistical[] = [ 
                    'month' => $month, 
                    'value' => $totalValue,
                ]; 
            }
        }   
        
        return response()->json([
            'statistical' => $statistical,
        ], 200);
    }
}
