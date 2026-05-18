import { useState } from "react";

const ContactSection = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ firstName: "", lastName: "", phone: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="bg-[#e6f4ec] py-16 md:py-24">
      <div className="max-w-xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-[#333333] mb-2">
            დაგვიტოვეთ ნომერი
          </h2>
          <p className="text-[#333333] mb-6">
            შეავსეთ ფორმა და ჩვენ დაგიკავშირდებით
          </p>

          {submitted ? (
            <div className="bg-[#e6f4ec] border border-[#1f3f3a]/20 text-[#1f3f3a] rounded-lg p-4 text-center">
              მადლობა! ჩვენ მალე დაგიკავშირდებით.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  სახელი
                </label>
                <input
                  type="text"
                  required
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#1f3f3a] focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  გვარი
                </label>
                <input
                  type="text"
                  required
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#1f3f3a] focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  ტელეფონის ნომერი
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  placeholder="+995 5XX XXX XXX"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#1f3f3a] focus:border-transparent transition"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#1f3f3a] text-white font-semibold py-3 rounded-lg hover:bg-[#1f3f3a]/80 transition-colors cursor-pointer"
              >
                გაგზავნა
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
