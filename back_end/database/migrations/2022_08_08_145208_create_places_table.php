<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     *     
     *
     * @return void
     */
    public function up()
    {
        // Schema::create('places', function (Blueprint $table) {
        //     $table->id();
        //     $table->string("statut");
        //     $table->foreignId('equipe_id')->references('id')->on('equipes')->onDelete('cascade');
        //     $table->timestamps();
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('places');
    }
};
