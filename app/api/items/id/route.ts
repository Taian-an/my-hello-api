import { NextResponse } from 'next/server';

// 這裡需要引用同一個 items 變數，實作中通常是 DB
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const body = await request.json();
  // 邏輯：更新 items 陣列中 id 符合的資料
  return NextResponse.json({ message: "Item updated" });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  // 邏輯：過濾掉該 id
  return NextResponse.json({ message: "Item deleted" });
}

