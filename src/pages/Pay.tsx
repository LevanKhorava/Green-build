const Pay = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 py-8">
      <iframe
        src="https://app.keepz.me/pay?qrType=REQUEST&receiverType=BRANCH&receiverId=790c4114-15be-4185-ac37-7d32f488179d&integratorId=c7932b8f-e17c-4030-be33-b83363f83fc1&integratorOrderId=80f29d97-199a-485d-8614-6f1b225f538e&amount=296.48&currency=GEL&lng=ka"
        title="Keepz Payment"
        className="w-full max-w-lg h-100 border-0 rounded-2xl shadow-lg"
        allow="payment"
      />
    </div>
  );
};

export default Pay;
