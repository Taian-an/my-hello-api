'use client';
import { useState, useEffect } from 'react';

export default function ItemManager() {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [form, setForm] = useState({ itemName: '', itemCategory: '', itemPrice: '', status: 'Available' });

  // 取得資料（包含分頁邏輯）
  const fetchData = async () => {
    const res = await fetch(`/api/items?page=${page}`);
    const result = await res.json();
    setItems(result.data);
    setTotalPages(result.totalPages);
  };

  useEffect(() => { fetchData(); }, [page]);

  // 新增資料
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/items', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' }
    });
    setForm({ itemName: '', itemCategory: '', itemPrice: '', status: 'Available' });
    setPage(1); // 回到第一頁看結果
    fetchData();
  };

  // 刪除資料
  const handleDelete = async (id: number) => {
    if (confirm('Are you sure?')) {
      await fetch(`/api/items?id=${id}`, { method: 'DELETE' });
      fetchData();
    }
  };

  return (
    <main className="p-10 font-sans">
      <h1 className="text-2xl font-bold mb-6">CRUD Item Management</h1>

      {/* 新增表單 */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-8 bg-gray-100 p-4 rounded">
        <input className="border p-2" placeholder="Item Name" value={form.itemName} onChange={e => setForm({...form, itemName: e.target.value})} required />
        <input className="border p-2" placeholder="Category" value={form.itemCategory} onChange={e => setForm({...form, itemCategory: e.target.value})} required />
        <input className="border p-2" type="number" placeholder="Price" value={form.itemPrice} onChange={e => setForm({...form, itemPrice: e.target.value})} required />
        <select className="border p-2" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
          <option value="Available">Available</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Add Item</button>
      </form>

      {/* 物品清單表格 */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Category</th>
            <th className="border p-2 text-left">Price</th>
            <th className="border p-2 text-left">Status</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="border p-2">{item.itemName}</td>
              <td className="border p-2">{item.itemCategory}</td>
              <td className="border p-2">${item.itemPrice}</td>
              <td className="border p-2">{item.status}</td>
              <td className="border p-2">
                <button onClick={() => handleDelete(item.id)} className="text-red-500 underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 分頁按鈕 */}
      <div className="mt-6 flex items-center gap-4">
        <button className="border px-4 py-1 disabled:opacity-30" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button className="border px-4 py-1 disabled:opacity-30" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </main>
  );
}
