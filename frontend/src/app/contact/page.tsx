export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <form className="bg-white shadow rounded-xl p-6 space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border p-3 rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border p-3 rounded"
        />
        <textarea
          placeholder="Your Message"
          rows={5}
          className="w-full border p-3 rounded"
        />
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Send Message
        </button>
      </form>
    </div>
  );
}
