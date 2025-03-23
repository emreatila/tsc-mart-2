// app/api/categories/route.ts
import { NextResponse } from 'next/server';

type Category = {
  id: number;
  name: string;
};

let categories: Category[] = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Books' }
];

export async function GET() {
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name) {
      return NextResponse.json(
        { error: "Name alanı zorunludur." },
        { status: 400 }
      );
    }

    const newCategory = {
      id: categories.length + 1,
      name: body.name
    };

    categories.push(newCategory);
    return NextResponse.json(newCategory, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: "Geçersiz istek" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const id = Number(body.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Geçersiz ID." },
        { status: 400 }
      );
    }

    const baslangic = categories.length;
    categories = categories.filter(c => c.id !== id);

    if (categories.length === baslangic) {
      return NextResponse.json(
        { error: "Kategori bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json(null, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: "Geçersiz istek" },
      { status: 400 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const id = Number(body.id);

    if (isNaN(id) || !body.name) {
      return NextResponse.json(
        { error: "Geçersiz id veya name." },
        { status: 400 }
      );
    }

    const index = categories.findIndex(c => c.id === id);

    if (index == -1) {
      return NextResponse.json(
        { error: "Kategori bulunamadı" },
        { status: 404 }
      );
    }
    
    categories[index].name = body.name;
    return NextResponse.json(null, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: "Geçersiz istek" },
      { status: 400 }
    );
  }
}
