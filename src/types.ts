export interface NavRoute {
  title: string;
  href: string;
  icon?: string;
}
export interface CardItem{
    intitule: string;
    prix: string;
    icon: string;
    date: string;
}
export interface Peinture{
    id?: number;
    name: string;
    price: number;
    quantity: number;
    category: string;
    description: string;
    image: string;
    statut: string;
}
    // { matricule: "A001", date: "12/05/2023", designation: "Peinture rouge", stock: 20, entres: 5, sorties: 2, restes: 23 },
export interface Stock{
    matricule: string;
    date: string;
    designation: string;
    stock: number;
    entres: number;
    sorties: number;
    restes: number;
}