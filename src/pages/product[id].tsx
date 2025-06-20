// pages/product/[id].tsx
import { fetchProductById } from '@/lib/db/products';
import { useEffect, useState } from 'react';
import { Spinner, Card, CardHeader, CardBody, Image } from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import { Product } from '@/utils/types/product';

export default function ProductDetail() {
  const { query } = useParams();
  const [product, setProduct] = useState<Product>(null);

  useEffect(() => {
    if (query.id) {
      fetchProductById(query.id as string)
        .then(setProduct)
        .catch(console.error);
    }
  }, [query.id]);

  if (!product) return <Spinner color="primary" />;

  return (
    <Card className="max-w-md mx-auto p-4">
      <CardHeader>{product.name}</CardHeader>
      <CardBody>
        <Image
          src={product.image_url}
          width={400}
          height={400}
          alt={product.name}
        />
        <p>{product.description}</p>
        <p className="text-lg font-bold mt-4">GH₵ {product.price}</p>
      </CardBody>
    </Card>
  );
}
