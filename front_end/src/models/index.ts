export interface FAQ {
  question: string;
  answer: string;
  status: boolean;
}
export interface dataCollaborateur {
  nom: string;
  prenom: string;
  phone: string;
  adresse: string;
  telephone?: string;
  image:string;
  email:string;
  equepe : string;
  error_list?: object;
}
export interface managerData {
  nom: string;
  prenom: string;
  phone: string;
  email:string;
  image:string;
  adresse: string;
  equepe_id : string;
}
export interface equipe {
  nom: String;
  nb_places: Number;
}

