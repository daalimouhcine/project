<?php

namespace App\Http\Controllers;

use App\Models\Manager;
use App\Models\Collaborateur;
use App\Models\Equipe;
use App\Http\Requests\StoreManagerRequest;
use App\Http\Requests\UpdateManagerRequest;
use illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ManagerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $manager = Manager::join("equipes", function ($join) {

            $join->on("managers.equipe_id", "=", "equipes.id");
        })->get(["managers.id","nom","name","prenom","phone","adresse","email","image"]);

     return response()->json([
        'message' => 'success',
        'data' => $manager,
        'numberManagers'=>Manager::count(),
        'error' => 'false',
        'results' => 'true'
     ], 200);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreManagerRequest  $request
     * @return \Illuminate\Http\Response
     */

    public function store(StoreManagerRequest $request)
    {
        //get the last id equipe 
        $getidequipe = Equipe::all()->last()->id;
        //create new manager by affecting last id equipe we just created 
        $manager = Manager::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->input('nom').".".$request->input('prenom')."@manager.com",
            'password' => Hash::make('password'),
            'phone' => $request->phone,
            'adresse' => $request->adresse,
            'equipe_id' => $getidequipe
        ]);
        return response()->json([
            'message' => 'success',
            'data' => $manager,
            'error' => 'false',
            'results' => 'true'
        ], 200);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Manager  $manager
     * @return \Illuminate\Http\Response
     */
    public function show(Manager $manager)
    {
        $manager = Manager::find($manager->id);

        //check if manager exist
        if (!$manager) {
            return response()->json([
                'message' => 'manager not found',
                'error' => 'true',
                'results' => 'false'

            ], 404);

        }
        return response()->json([
            'message' => 'Manager detail',
            'code' => '200',
            'error' => 'false',
            'results' => $manager
        ],200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Manager  $manager
     * @return \Illuminate\Http\Response
     */
    public function edit(Manager $manager)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateManagerRequest  $request
     * @param  \App\Models\Manager  $manager
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateManagerRequest $request, Manager $manager)
    {

        $this->validate($request, [
            'nom' => 'required',
            'prenom' => 'required',
            'phone' => 'required',
            'adresse' => 'required',

        ]);

        $manager = Manager::find($manager->id);

            //check if manager exist

            if (!$manager) {
                return response()->json([
                    'message' => 'manager not found',
                    'error' => 'true',
                    'results' => 'false'
                ], 200);
            } else {
                $manager->update($request->all());

                return response()->json([
                        'message' => 'manager updated',
                        'status' => 200,
                        'data' => $manager
                    ],200);
            }



    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Manager  $manager
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Manager::where('id',$id)->delete();
        return response()->json([
            'status'=>200,
            'message'=>'avec success',
        ]);
    }
// get Manager's equipe and collaborateurs
    public function all($id){
        $manager = Equipe::find($id)->manager;
        $collaborateurs = Equipe::find($id)->collaborateurs;
        // $collab = DB::table('collaborateurs')->where('equipe_id',$manager)->get();
        return response()->json([
            'message' => 'success',
            'code' => '200',
            'error' => 'false',
            'manager' => $manager,
            'collabs' => $collaborateurs

        ],200);

    }

    // public function COUNT_equipe($equipe_id){
    //     $collab = collaborateurs::where('equipe_id',$equipe_id)->count();
    //     // $manager = manager::where('equipe_id',$equipe_id)->count();
    //     // return view('manager',compact('manager')) ;
    //     return response()->json([
    //         'collab' => $collab

    //     ],200);
    // }





}
