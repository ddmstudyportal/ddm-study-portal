export default function DashboardStats() {

  const cards = [

    {
      title: "Courses",
      value: "05",
      color: "bg-blue-600",
    },

    {
      title: "Notes",
      value: "120",
      color: "bg-green-600",
    },

    {
      title: "Downloads",
      value: "56",
      color: "bg-yellow-500",
    },

    {
      title: "Tests",
      value: "15",
      color: "bg-purple-600",
    },

  ];

  return (

    <div className="grid md:grid-cols-4 gap-6 mt-8">

      {cards.map((card) => (

        <div
          key={card.title}
          className={`${card.color} rounded-2xl p-6 text-white shadow-lg`}
        >

          <h2 className="text-lg">
            {card.title}
          </h2>

          <p className="text-4xl font-bold mt-4">
            {card.value}
          </p>

        </div>

      ))}

    </div>

  );

}