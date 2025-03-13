<?php

namespace App\Filters;

use Illuminate\Http\Request;

class CourseFilter{
    protected $allowedParamaters = [
        'type_id' => ['eq'],
        'training_mode_id' => ['eq'],
        'category_id' => ['eq'],
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'gt' => '>',
        'lte' => '<=',
        'gte' => '>=',
    ];

    public function transform(Request $request){
        $eloQuery = [];

        foreach($this->allowedParamaters as $parm => $operators){
            $query = $request->query($parm);

            if(!isset($query)){
                continue;
            }

            // foreach ($operators as $operator){
            //     if(isset($query[$operator])){
            //         $eloQuery[] = [$parm, function($query){
            //             $query->where('')
            //         }, $this->operatorMap[$operator], $query[$operator]];
            //     }
            // }
        }

        return $eloQuery;
    }
}