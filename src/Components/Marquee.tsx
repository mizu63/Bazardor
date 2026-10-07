import MarqueeText from "react-marquee-text";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products?category=chal"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Product[] = await res.json();

  return (
    <div className="bg-red-600 text-white">
      <div className="mx-auto flex max-w-7xl items-center gap-2">
        <div className="shrink-0 bg-red-600 px-2 font-bold">
          সর্বশেষ
        </div>

        <MarqueeText
          direction="right"
          duration={10}
          className="px-2 py-1 text-sm"
        >
          {data.map((product) => (
            <span key={product.id} className="mx-4">
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "—"}

              {" "}
              {product.nameBn} — {product.today} টাকা/{product.unit}{" "}

              <span>
                {product.change.pct > 0
                  ? `+${product.change.pct}%`
                  : `${product.change.pct}%`}
              </span>

              <span className="mx-4">•</span>
            </span>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;