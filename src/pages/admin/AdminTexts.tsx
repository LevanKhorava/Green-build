import { useEffect, useMemo, useState } from "react";
import { fetchTexts, resetTexts, saveTexts } from "../../lib/textsApi";
import { defaultTexts, textGroups } from "../../data/siteTexts";
import type { TextGroup } from "../../data/siteTexts";

const inputClass =
  "w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-[#1f3f3a] focus:outline-none text-sm";

const GroupEditor = ({
  group,
  values,
  overridden,
  onChange,
  onSave,
  onReset,
  saving,
}: {
  group: TextGroup;
  values: Record<string, string>;
  overridden: Set<string>;
  onChange: (key: string, value: string) => void;
  onSave: (group: TextGroup) => void;
  onReset: (group: TextGroup) => void;
  saving: boolean;
}) => {
  const [open, setOpen] = useState(false);

  const dirty = group.fields.some(
    (f) => values[f.key] !== (defaultTexts[f.key] ?? ""),
  );
  const changedCount = group.fields.filter((f) => overridden.has(f.key)).length;

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-bold text-[#1f3f3a]">
          {group.title}
          {changedCount > 0 && (
            <span className="ml-2 text-xs font-medium text-[#26b462]">
              ({changedCount} შეცვლილი)
            </span>
          )}
        </span>
        <span className="text-[#1f3f3a]/60 text-sm">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
          {group.fields.map((field) => (
            <div key={field.key}>
              <label className="flex items-center justify-between text-sm font-medium text-[#1f3f3a] mb-1">
                <span>{field.label}</span>
                {overridden.has(field.key) && (
                  <span className="text-[11px] text-[#26b462]">შეცვლილია</span>
                )}
              </label>
              {field.multiline ? (
                <textarea
                  value={values[field.key] ?? ""}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  rows={3}
                  className={`${inputClass} resize-y`}
                />
              ) : (
                <input
                  value={values[field.key] ?? ""}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  className={inputClass}
                />
              )}
            </div>
          ))}

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => onSave(group)}
              disabled={saving || !dirty}
              className="bg-[#1f3f3a] text-white font-semibold px-5 py-2 rounded-lg text-sm
                hover:bg-[#16302c] disabled:opacity-40 transition-colors"
            >
              {saving ? "ინახება..." : "შენახვა"}
            </button>
            <button
              onClick={() => onReset(group)}
              disabled={saving || changedCount === 0}
              className="border border-gray-300 text-[#1f3f3a] px-5 py-2 rounded-lg text-sm
                hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              საწყისზე დაბრუნება
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

const AdminTexts = () => {
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [values, setValues] = useState<Record<string, string>>(defaultTexts);
  const [loading, setLoading] = useState(true);
  const [savingGroup, setSavingGroup] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    fetchTexts()
      .then((data) => {
        setOverrides(data);
        setValues({ ...defaultTexts, ...data });
      })
      .finally(() => setLoading(false));
  }, []);

  const overridden = useMemo(() => new Set(Object.keys(overrides)), [overrides]);

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (group: TextGroup) => {
    setError("");
    setNotice("");
    setSavingGroup(group.id);
    try {
      // Only store what actually differs from the default.
      const changed: Record<string, string> = {};
      const revertedToDefault: string[] = [];

      for (const field of group.fields) {
        const value = values[field.key] ?? "";
        if (value === (defaultTexts[field.key] ?? "")) {
          if (overridden.has(field.key)) revertedToDefault.push(field.key);
        } else {
          changed[field.key] = value;
        }
      }

      await saveTexts(changed);
      await resetTexts(revertedToDefault);

      setOverrides((prev) => {
        const next = { ...prev, ...changed };
        for (const key of revertedToDefault) delete next[key];
        return next;
      });
      setNotice(`"${group.title}" შენახულია`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "შენახვა ვერ მოხერხდა");
    } finally {
      setSavingGroup(null);
    }
  };

  const handleReset = async (group: TextGroup) => {
    if (!window.confirm(`"${group.title}" დაბრუნდეს საწყის ტექსტზე?`)) return;
    setError("");
    setNotice("");
    setSavingGroup(group.id);
    try {
      const keys = group.fields.map((f) => f.key);
      await resetTexts(keys);
      setOverrides((prev) => {
        const next = { ...prev };
        for (const key of keys) delete next[key];
        return next;
      });
      setValues((prev) => {
        const next = { ...prev };
        for (const key of keys) next[key] = defaultTexts[key] ?? "";
        return next;
      });
      setNotice(`"${group.title}" დაბრუნდა საწყის ტექსტზე`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "დაბრუნება ვერ მოხერხდა");
    } finally {
      setSavingGroup(null);
    }
  };

  if (loading) return <p className="text-[#1f3f3a]/70">იტვირთება...</p>;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-[#1f3f3a] mb-1">საიტის ტექსტები</h2>
        <p className="text-sm text-[#1f3f3a]/70">
          გახსენით სექცია, შეცვალეთ ტექსტი და დააჭირეთ „შენახვა“. ცვლილებები
          მაშინვე აისახება საიტზე.
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
          {error}
        </p>
      )}
      {notice && (
        <p className="text-sm text-[#1f3f3a] bg-[#e6f4ec] border border-[#26b462]/30 rounded-lg p-3">
          {notice}
        </p>
      )}

      {textGroups.map((group) => (
        <GroupEditor
          key={group.id}
          group={group}
          values={values}
          overridden={overridden}
          onChange={handleChange}
          onSave={handleSave}
          onReset={handleReset}
          saving={savingGroup === group.id}
        />
      ))}
    </div>
  );
};

export default AdminTexts;
