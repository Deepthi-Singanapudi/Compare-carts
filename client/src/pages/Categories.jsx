function Categories() {
  const categories = [
    {
      name: "Mobiles",
      desc: "Real battery, camera and performance feedback.",
    },
    {
      name: "Laptops",
      desc: "Thermals, keyboard feel, display, long-term performance.",
    },
    {
      name: "Earphones & Headphones",
      desc: "Sound quality, comfort, mic clarity.",
    },
    {
      name: "Accessories",
      desc: "Cables, chargers, cases, power banks.",
    },
    {
      name: "Home Appliances",
      desc: "Washing machines, fridges, ACs, kitchen items.",
    },
    {
      name: "Other",
      desc: "Everything that doesn’t fit in a box 😄",
    },
  ];

  return (
    <div>
      <h2 className="section-title">Categories</h2>
      <p className="section-subtitle">
        Explore reviews by the type of products you are interested in.
      </p>

      <div className="card-grid">
        {categories.map((cat) => (
          <div key={cat.name} className="card">
            <h4 className="card-title">{cat.name}</h4>
            <p className="card-text">{cat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
