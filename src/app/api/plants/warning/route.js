import { NextResponse } from 'next/server';

export async function GET() {
  const warningPlants = [
    {
      id: 1,
      name: 'Helecho Doméstico',
      scientific: 'Nephrolepis exaltata',
      needs: [ 'regar' ],
      img: 'https://jardinjasmin.com/wp-content/uploads/2020/03/nephrolepsis-boston.png'
    },
    {
      id: 2,
      name: 'Caracola Roja',
      scientific: 'Iresine herbstii',
      needs: [ 'fertilizar' ],
      img: 'https://www.plantasyhongos.es/herbarium/i/Iresine_herbstii_01b.jpg'
    },
    {
      id: 3,
      name: 'Jade',
      scientific: 'Crassula Ovata',
      needs: [ 'regar', 'fertilizar' ],
      img: 'https://growsomething.ca/cdn/shop/files/PXL_20230704_215448408.PORTRAIT_2.jpg?v=1688557844&width=1946'
    }
  ];

  return NextResponse.json(warningPlants, { status: 200 });
}