"use client";

import useAuth from "@/middleware/useLogin";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isAuthenticated = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://api.nike.com/cic/browse/v2?queryid=products&anonymousId=E41564B698556817E4F8D82F1DB8A463&country=id&endpoint=%2Fproduct_feed%2Frollup_threads%2Fv2%3Ffilter%3Dmarketplace(ID)%26filter%3Dlanguage(en-GB)%26filter%3DemployeePrice(true)%26filter%3DattributeIds(498ac76f-4c2c-4b55-bbdc-dd37011887b1)%26anchor%3D24%26consumerChannelId%3Dd9a5bc42-4b9c-4976-858a-f159cf99c647%26count%3D24&language=en-GB&localizedRangeStr=%7BlowestPrice%7D%E2%80%94%7BhighestPrice%7D"
        );
        const data = await res.json();
        setProducts(data.data.products.products || []);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const Logout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading products...</div>;
  }

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(number);
  };

  return (
    <div>
      <h1>Products Page</h1>
      <button
        onClick={Logout}
        className="bg-black py-2 px-4 rounded-md text-white"
      >
        Logout
      </button>
      <div className="grid grid-cols-3 gap-4 px-4">
        {products.map((product: any) => (
          <div
            key={product.cloudProductId}
            className="border justify-center flex flex-col hover:border-black hover:opacity-50 shadow-lg rounded-md"
          >
            <Image
              src={product.images.portraitURL}
              alt={product.title}
              className="w-full"
              width={400}
              height={400}
            />
            <div className="p-4">
              <h2>{product.title}</h2>
              <p>{product.colorDescription}</p>
              <b>{formatRupiah(product.price.currentPrice)}</b>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
