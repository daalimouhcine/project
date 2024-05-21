<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     *      * Define attribute for table Demande.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('demandes', function (Blueprint $table) {
            $table->id();
            $table->string("type");
            $table->text('message');
            $table->Date("date");
            $table->integer("num_place");
            $table->foreignId('collaborateur_id')->references('id')->on('collaborateurs')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('manager_id')->references('id')->on('managers')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('demandes');
    }
};
