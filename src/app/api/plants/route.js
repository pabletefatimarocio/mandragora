import { NextResponse } from "next/server";

export async function GET(){
    const cardsPlants = [
        {
            id: 1,
            name:'Helecho Doméstico',
            scientific:'Nephrolepis exaltata',
            img: 'https://jardinjasmin.com/wp-content/uploads/2020/03/nephrolepsis-boston.png',
        },

         {
            id: 2,
            name:'Girasol',
            scientific:'Helianthus annuus',
            img: 'https://hips.hearstapps.com/hmg-prod/images/gettyimages-173230110-64c785f97fe37.jpg',
        },
         {
            id: 3,
            name:'Jade',
            scientific:'Crassula Ovata',
            img: 'https://growsomething.ca/cdn/shop/files/PXL_20230704_215448408.PORTRAIT_2.jpg?v=1688557844&width=1946',
        },
         {
            id: 4,
            name:'Caracola Roja',
            scientific:'Iresine herbstii',
            img: 'https://www.plantasyhongos.es/herbarium/i/Iresine_herbstii_01b.jpg',
        },
        {
            id: 5,
            name:'Jazmín',
            scientific:'Jasminum',
            img: 'https://azaleatiendabotanica.home.blog/wp-content/uploads/2020/09/gardenia-5097886_1920.jpg?w=1024',
        },
        {
            id: 6,
            name:'Amapola silvestre',
            scientific:'Papaver rhoeas',
            img: 'https://m.media-amazon.com/images/I/61JFejExUmL._AC_UF894,1000_QL80_.jpg',
        },
        {
            id: 7,
            name:'Sansevieria',
            scientific:'Sansevieria',
            img: 'https://phantom-elmundo.uecdn.es/1cf0b5241f5717cf941be61bb9a16472/resize/828/f/webp/assets/multimedia/imagenes/2023/01/13/16736014713489.jpg',
        },
        {
            id: 8,
            name:'Monstera',
            scientific:'Monstera',
            img: 'https://viverocuipo.com/cdn/shop/articles/monstera_deliciosa_panama.png?v=1662413766',
        },


    ];

    return NextResponse.json(cardsPlants, {status: 200});
}