import { NextResponse } from 'next/server';

// 模擬資料庫
let items = [
  { id: 1, itemName: "MacBook Pro", itemCategory: "Electronics", itemPrice: 50000, status: "Available" },
  { id: 2, itemName: "iPhone 15", itemCategory: "Electronics", itemPrice: 30000, status: "Out of Stock" },
  { id: 3, itemName: "iPad Air", itemCategory: "Electronics", itemPrice: 18000, status: "Available" },
  { id: 4, itemName: "Sony Headphones", itemCategory: "Electronics", itemPrice: 8000, status: "Available" },
  { id: 5, itemName: "Logitech Mouse", itemCategory: "PC", itemPrice: 2000, status: "Available" },
  { id: 6, itemName: "Monitor 24 inch", itemCategory: "PC", itemPrice: 4500, status: "Out of Stock" },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 5; // 每頁顯示 5 筆
  
  const startIndex = (page - 1) * limit;
  const paginatedItems = items.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    data: paginatedItems,
    total: items.length,
    totalPages: Math.ceil(items.length / limit)
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newItem = { id: Date.now(), ...body };
  items.unshift(newItem); // 放到最前面，方便觀察
  return NextResponse.json(newItem, { status: 201 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get('id') || '');
  items = items.filter(item => item.id !== id);
  return NextResponse.json({ success: true });
}
