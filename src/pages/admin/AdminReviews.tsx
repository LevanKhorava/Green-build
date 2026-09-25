import { useEffect, useState } from "react";
import {
  createReview,
  deleteReview,
  fetchReviews,
  updateReview,
} from "../../lib/reviewsApi";
import type { ReviewInput } from "../../lib/reviewsApi";
import { parseYoutubeId, thumbnailUrl } from "../../data/videos";
import type { Video } from "../../data/videos";

const emptyForm: ReviewInput = { youtubeId: "", title: "", author: "" };

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#1f3f3a] focus:outline-none";

const AdminReviews = () => {
  const [items, setItems] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<ReviewInput>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReviews()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const startEdit = (item: Video) => {
    setEditingId(item.id);
    setForm({
      youtubeId: item.youtubeId,
      title: item.title,
      author: item.author,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // A pasted YouTube link works as well as a bare id.
    const payload = { ...form, youtubeId: parseYoutubeId(form.youtubeId) };
    if (!payload.youtubeId) {
      setError("მიუთითეთ YouTube ვიდეოს ბმული ან ID");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        const updated = await updateReview(editingId, payload);
        setItems((prev) =>
          prev.map((it) => (it.id === editingId ? updated : it)),
        );
      } else {
        const created = await createReview(payload);
        setItems((prev) => [...prev, created]);
      }
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "შენახვა ვერ მოხერხდა");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: Video) => {
    if (!window.confirm(`წავშალოთ "${item.author}"-ის შეფასება?`)) return;
    setError("");
    try {
      await deleteReview(item.id);
      setItems((prev) => prev.filter((it) => it.id !== item.id));
      if (editingId === item.id) resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "წაშლა ვერ მოხერხდა");
    }
  };

  const previewId = parseYoutubeId(form.youtubeId);

  return (
    <div className="space-y-8">
      {/* Editor */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-[#1f3f3a] mb-4">
          {editingId ? "შეფასების რედაქტირება" : "ახალი შეფასება"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1f3f3a] mb-1">
              YouTube ბმული ან ID
            </label>
            <input
              value={form.youtubeId}
              onChange={(e) => setForm({ ...form, youtubeId: e.target.value })}
              required
              placeholder="https://www.youtube.com/watch?v=..."
              className={inputClass}
            />
            {previewId && (
              <p className="text-xs text-[#1f3f3a]/60 mt-1">ID: {previewId}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
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
                ავტორი
              </label>
              <input
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                required
                className={inputClass}
              />
            </div>
          </div>

          {previewId && (
            <img
              src={thumbnailUrl(previewId)}
              alt=""
              className="h-32 w-full sm:w-56 object-cover rounded-lg border border-gray-100"
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
          შეფასებები ({items.length})
        </h2>

        {loading ? (
          <p className="text-[#1f3f3a]/70">იტვირთება...</p>
        ) : items.length === 0 ? (
          <p className="text-[#1f3f3a]/70">შეფასებები ჯერ არ არის დამატებული.</p>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4 items-center"
              >
                <img
                  src={thumbnailUrl(item.youtubeId)}
                  alt=""
                  className="w-24 h-16 object-cover rounded-lg shrink-0"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-[#1f3f3a] truncate">
                    {item.author}
                  </h3>
                  <p className="text-sm text-[#1f3f3a]/70 truncate">
                    {item.title}
                  </p>
                  <a
                    href={`https://www.youtube.com/watch?v=${item.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#26b462] hover:underline"
                  >
                    {item.youtubeId}
                  </a>
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

export default AdminReviews;
