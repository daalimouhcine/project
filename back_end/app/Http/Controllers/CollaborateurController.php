<?php

namespace App\Http\Controllers;

use App\Models\Collaborateur;
use App\Http\Requests\StoreCollaborateurRequest;
use App\Http\Requests\UpdateCollaborateurRequest;

use App\Models\Equipe;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CollaborateurController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $collaborateur = Collaborateur::join("equipes", function ($join) {

            $join->on("collaborateurs.equipe_id", "=", "equipes.id");
        })->select(["collaborateurs.id","nom","name","prenom","phone","adresse","email","image"])->get();
        return response()->json([
            'collaborateurs'=>$collaborateur,
            'numberCollaborateurs'=>$collaborateur->count(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)

    {
     /*   $validation = validator::make($request->all().[
                'nom'=>'required',
                'prenom'=>'required',
                'email'=>'required',
                'phone'=>'required',
                'address'=>'required',
            ]);
        if($validation->fails()){
            return response()->json([
                'status'=>400,
                'errors'=>$validation->messages(),
            ]);
        }*/

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCollaborateurRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCollaborateurRequest $request)
    {
        $collaborateur = new Collaborateur();
        $collaborateur->nom = $request->input('nom');
        $collaborateur->prenom = $request->input('prenom');
        $collaborateur->email = $request->input('nom').".".$request->input('prenom')."@collab.com";
        $collaborateur->phone = $request->input('phone');
        $collaborateur->adresse = $request->input('adresse');
        $collaborateur->password = Hash::make('password');
        $collaborateur->equipe_id = $request->input('equepe');
        $collaborateur->save();
        return response()->json([
            'status'=>200,
            'message'=>'collaborateurr a été ajouter avec success',
        ]);
    }

    /**
     * Display the specified resource for a collaborateur with his team's name.
     *
     * @param  \App\Models\Collaborateur  $collaborateur
     * @return \Illuminate\Http\Response
     */
    public function show(Collaborateur $collaborateur)
    {
        $collaborateur = Collaborateur::join("equipes", function ($join) {

            $join->on("collaborateurs.equipe_id", "=", "equipes.id");
        })->select("collaborateurs.id","nom","name","prenom","phone","adresse","email","image")->find($collaborateur->id);
        if (!$collaborateur) {
            return response()->json([
                'message' => "collaborateur n'existe pas",
                'error' => 'true',
                'results' => 'false'
            ], 200);
        } else {

            return response()->json([
                'message' => 'collaborateur exist',
                'status' => 200,
                'results' => $collaborateur,
            ],200);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Collaborateur  $collaborateur
     * @return \Illuminate\Http\Response
     */
    public function edit(Collaborateur $collaborateur)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCollaborateurRequest  $request
     * @param  \App\Models\Collaborateur  $collaborateur
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {


        $collaborateur = Collaborateur::find($id);

        if (!$collaborateur) {
            return response()->json([
                'message' => "collaborateur n'existe pas",
                'error' => 'true',
                'results' => 'false'
            ], 404);
        } else {
            $collaborateur->update($request->all());
            return response()->json([
                'message' => 'collaborateur est modifier',
                'status' => 200,
                'results' => $collaborateur
            ],200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Collaborateur  $collaborateur
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Collaborateur::where('id',$id)->delete();
        return response()->json([
            'status'=>200,
            'message'=>'avec success',
        ]);
    }
    public function all()
    {

    }

    public function COUNT_equipe($equipe_id){
        $collab = Collaborateur::where('equipe_id',$equipe_id)->count();
        $SurSite = Reservation::where('equipe_id',$equipe_id)->where('date',date("Y-m-d"))->count();
        // return view('manager',compact('manager')) ;
        return response()->json([
            'collab' => $collab -$SurSite,
            'present' => $SurSite,
            'numberCollaborateusEquipe'=> $collab,
        ],200);
    }


    public function collabParEquipe($equipe_id){
        $collabs = Collaborateur::where('equipe_id',$equipe_id)->get();


        return response()->json([
            'status' => 200,
            'collabs' => $collabs,
            'message' => 'collaborateur par equipe',
        ],200);
    }
/** 
 *  *this function will return each collaborateur with his status (sur site ou a distance)
*/

    public function Status_Collab(Request $request )
    {
        $SurSite = Reservation::where('equipe_id',$request->equipe_id)->where('date',$request->date)->get();

        $subset = $SurSite->map(function ($user) {
            return collect($user->toArray())
                ->only('collaborateur_id')
                ->all();
        });

     return response()->json([
        'data' => $subset,
     ], 200);
    }

/**
 * *this method is for searching for specific collaborateur by his name.
 */
    public function search(Request $request,$nom)
    {
        $collaborateur = Collaborateur::where('nom', 'like', '%' .$nom. '%')->get();

        return response()->json([
            'collaborateurs'=>$collaborateur,
            'numberCollaborateurs'=>$collaborateur->count(),
        ]);
    }

// get name equipe with collaborateurs
/**
 * *this method is for getting all collaborateurs by the selected team Id.
 */
   public function getCollaborateurEquipe($equipe_id)
   {
       $collaborateurs = Collaborateur::where('equipe_id',$equipe_id)->get();
       $equipe = Equipe::find($equipe_id);
       return response()->json([
           'collaborateurs'=>$collaborateurs,
           'equipe'=>$equipe,
       ]);
   }




/**
 * *Getting collabs analyse  for each week
 */
    public function status_Jours(Request $request)
    {
        $S_id_1 = Reservation::where('equipe_id',$request->equipe_id)->where('date',$request->date[0])->get('collaborateur_id');
        $S_id_2 = Reservation::where('equipe_id',$request->equipe_id)->where('date',$request->date[1])->get('collaborateur_id');
        $S_id_3 = Reservation::where('equipe_id',$request->equipe_id)->where('date',$request->date[2])->get('collaborateur_id');
        $S_id_4 = Reservation::where('equipe_id',$request->equipe_id)->where('date',$request->date[3])->get('collaborateur_id');
        $S_id_5 = Reservation::where('equipe_id',$request->equipe_id)->where('date',$request->date[4])->get('collaborateur_id');
        // return response()->json(['request'=>$request->date]);

        return response()->json([
        'A1' => Collaborateur::where('equipe_id',$request->equipe_id)->whereNotIn('id',$S_id_1)->count(),
        'A2' => Collaborateur::where('equipe_id',$request->equipe_id)->whereNotIn('id',$S_id_2)->count(),
        'A3' => Collaborateur::where('equipe_id',$request->equipe_id)->whereNotIn('id',$S_id_3)->count(),
        'A4' => Collaborateur::where('equipe_id',$request->equipe_id)->whereNotIn('id',$S_id_4)->count(),
        'A5' => Collaborateur::where('equipe_id',$request->equipe_id)->whereNotIn('id',$S_id_5)->count(),
        'S1' => Reservation::where('equipe_id',$request->equipe_id)->where('date',$request->date[0])->count('collaborateur_id'),
        'S2' => Reservation::where('equipe_id',$request->equipe_id)->where('date',$request->date[1])->count('collaborateur_id'),
        'S3' => Reservation::where('equipe_id',$request->equipe_id)->where('date',$request->date[2])->count('collaborateur_id'),
        'S4' => Reservation::where('equipe_id',$request->equipe_id)->where('date',$request->date[3])->count('collaborateur_id'),
        'S5' => Reservation::where('equipe_id',$request->equipe_id)->where('date',$request->date[4])->count('collaborateur_id'),
     ], 200);
    }

}


