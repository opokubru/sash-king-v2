// components/ProductCard.tsx
import { Product } from '@/utils/types/product';
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Button,
  Link,
} from '@nextui-org/react';
import { motion } from 'framer-motion';

export const ProductCard = ({ product }: { product: Product }) => (
  <motion.div whileHover={{ scale: 1.02 }}>
    <Card isHoverable>
      <CardHeader>{product.name}</CardHeader>
      <CardBody>
        <Image
          src={product.image_url}
          alt={product.name}
          width={200}
          height={200}
        />
        <p>{product.description}</p>
        <p>GH₵ {product.price}</p>
        <Link href={`/product/${product.id}`}>
          <Button color="primary" variant="flat">
            View Details
          </Button>
        </Link>
      </CardBody>
    </Card>
  </motion.div>
);
