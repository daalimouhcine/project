<?php

namespace App\Http\Controllers;

use App\Models\Rh;
use App\Models\Manager;
use App\Models\Collaborateur;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request){

/*
*here we validate inputs for login  password is 'password' expect for the RH which is 'lmerrakchi123'


*/
        $fields = $request->validate([
            'role' => 'required|string',
        ]);

        if($fields['role'] === 'rh'){

            $user = Rh::where('email', $request->email)->first();
        }

        if($fields['role'] === 'manager'){

            $user = Manager::where('email', $request->email)->first();
        }

         if($fields['role'] === 'collaborateur'){

            $user = Collaborateur::where('email', $request->email)->first();
        }

            $check = Hash::check($request->password,$user->password);

        if(!$user || !$check){
            return response([
                'message' => 'Invalid credentials',
            ], 401);
        }

        $response = [
            'user' => $user,
            // 'token' => $token,
            'role' => $fields['role'],
        ];

        return response($response, 201);

















        // $fields = $request->validate([
        //     'email' => 'required|string',
        //     'password' => 'required|string',
        //     'role' => 'required|string',
        // ]);

        // if($fields['role'] === 'collaborateur'){
        //     $user = Collaborateur::where('email', $fields['email'])->first();
        // }

        // if($fields['role'] === 'manager'){
        //     $user = Manager::where('email', $fields['email'])->first();
        // }

        // if($fields['role'] === 'rh'){
        //     $user = Rh::where('email', $fields['email'])->first();
        // }


        // if(!$user || $fields['password'] != $user->password){
        //     return response([
        //         'message' => 'Invalid Credentials'
        //     ], 401);
        // }

        // $response = [
        //     'user' => $user,
        // ];

        // return response($response, 201);
    }
}
