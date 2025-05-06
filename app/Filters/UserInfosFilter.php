<?php

namespace App\Filters;

use Illuminate\Http\Request;

class UserInfosFilter{
    protected $allowedParamaters = [
        'title_id' => ['eq'],
        'department_id' => ['eq'],
        'branch_id' => ['eq'],
        'section_id' => ['eq'],
        'division_id' => ['eq'],
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

            foreach ($operators as $operator){
                if(isset($query[$operator])){
                    $eloQuery[] = [$parm, $this->operatorMap[$operator], $query[$operator]];
                }
            }
        }

        return $eloQuery;
    }
}