import { useEffect, useState } from "react";
import {
  createNews,
  deleteNews,
  fetchNews,
  updateNews,
} from "../../lib/newsApi";
import type { NewsInput } from "../../lib/newsApi";
import { formatDate } from "../../data/news";
import type { NewsItem } from "../../data/news";

const emptyForm: NewsInput = {
  title: "",
  description: "",
  date: new Date().toISOString().slice(0, 10),
  imageUrl: "",
};

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#1f3f3a] focus:outline-none";

const AdminNews = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<NewsInput>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNews()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const startEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description,
      date: item.date.slice(0, 10),
      imageUrl: item.imageUrl,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      if (editingId) {
        const updated = await updateNews(editingId, form);
        setItems((prev) =>
          prev.map((it) => (it.id === editingId ? updated : it)),
        );
      } else {
        const created = await createNews(form);
        setItems((prev) => [created, ...prev]);
      }
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "შენახვა ვერ მოხერხდა");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: NewsItem) => {
    if (!window.confirm(`წავშალოთ "${item.title}"?`)) return;
    setError("");
    try {
      await deleteNews(item.id);
      setItems((prev) => prev.filter((it) => it.id !== item.id));
      if (editingId === item.id) resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "წაშლა ვერ მოხერხდა");
    }
  };

  return (
    <div className="space-y-8">
      {/* Editor */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-[#1f3f3a] mb-4">
          {editingId ? "სიახლის რედაქტირება" : "ახალი სიახლე"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1f3f3a] mb-1">
              სათაური
            </label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1f3f3a] mb-1">
              აღწერა
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              rows={3}
              className={`${inputClass} resize-y`}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-[#1f3f3a] mb-1">
                თარიღი
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1f3f3a] mb-1">
                სურათის ბმული
              </label>
              <input
                type="url"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                required
                placeholder="https://..."
                className={inputClass}
              />
            </div>
          </div>

          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt=""
              className="h-32 w-full sm:w-64 object-cover rounded-lg border border-gray-100"
            />
          )}

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#1f3f3a] text-white font-semibold px-6 py-2.5 rounded-lg
                hover:bg-[#16302c] disabled:opacity-50 transition-colors"
            >
              {saving ? "ინახება..." : editingId ? "განახლება" : "დამატება"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="border border-gray-300 text-[#1f3f3a] px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                გაუქმება
              </button>
            )}
          </div>
        </form>
      </section>

      {/* List */}
      <section>
        <h2 className="text-xl font-bold text-[#1f3f3a] mb-4">
          სიახლეები ({items.length})
        </h2>

        {loading ? (
          <p className="text-[#1f3f3a]/70">იტვირთება...</p>
        ) : items.length === 0 ? (
          <p className="text-[#1f3f3a]/70">სიახლეები ჯერ არ არის დამატებული.</p>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4 items-center"
              >
                <img
                  src={item.imageUrl}
                  alt=""
                  className="w-24 h-16 object-cover rounded-lg shrink-0"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-[#1f3f3a]/60 mb-1">
                    {formatDate(item.date)}
                  </p>
                  <h3 className="font-semibold text-[#1f3f3a] truncate">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#1f3f3a]/70 line-clamp-1">
                    {item.description}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => startEdit(item)}
                    className="text-sm border border-gray-300 px-3 py-1.5 rounded-lg text-[#1f3f3a] hover:bg-gray-50 transition-colors"
                  >
                    რედაქტირება
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="text-sm border border-red-200 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    წაშლა
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminNews;
