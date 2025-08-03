import Link from 'next/link';
import { pathOr } from 'ramda';
import React from 'react';
import { MdArrowBack } from 'react-icons/md';

import { products } from '@/data/content';
import ButtonCircle3 from '@/shared/Button/ButtonCircle3';

import SectionMoreProducts from './SectionMoreProducts';
import SectionProductHeader from './SectionProductHeader';
// import SectionProductInfo from './SectionProductInfo';

type Props = {
  params: { productId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const getProductData = async (id: string) => {
  return products.find((item) => item.slug === id);
};

const SingleProductPage = async (props: Props) => {
  const selectedProduct = await getProductData(props.params.productId);

  return (
    <div className="container">
      <Link href="/products" className="mb-10">
        <ButtonCircle3 size="w-10 h-10" className="border border-neutral-300">
          <MdArrowBack className="text-2xl" />
        </ButtonCircle3>
      </Link>

      <div className="mb-20">
        <SectionProductHeader
          shots={pathOr([], ['shots'], selectedProduct)}
          productName={pathOr('', ['productName'], selectedProduct)}
          price={pathOr(0, ['price'], selectedProduct)}
          reviews={pathOr(0, ['reviews'], selectedProduct)}
          description={pathOr('', ['description'], selectedProduct)}
        />
      </div>
      <div className="mb-28">
        <SectionMoreProducts />
      </div>
    </div>
  );
};

export default SingleProductPage;
