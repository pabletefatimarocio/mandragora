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

    ];

    return NextResponse.json(cardsPlants, {status: 200});
}