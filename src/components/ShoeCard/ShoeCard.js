import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const isOnSale = variant === 'on-sale'
  const isRegular = variant === 'regular'

  const styles = {
    sale: {
      textDecoration: 'line-through',
      color: COLORS.gray[700],
      flagColor: COLORS.primary
    },
    regular: {
      textDecoration: 'none',
      color: COLORS.gray[900]
    },
    newRelease: {
      textDecoration: 'none',
      color: COLORS.gray[900],
      flagColor: COLORS.secondary
    }
  }

  const style = isOnSale ? styles.sale : isRegular ? styles.regular : styles.newRelease

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <PriceWrapper>
            <Price style={{'--textDecoration': style.textDecoration, '--color': style.color}}>{formatPrice(price)}</Price>
          </PriceWrapper>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {isOnSale && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
        { variant !== 'default' && <Flag style={{'--bgColor': style.flagColor}}>{isOnSale ? 'Sale' : 'Just released!' }</Flag>}
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Price = styled.span`
  color: var(--color);  
  text-decoration: var(--textDecoration);
  font-weight: 500;
`;

const Flag = styled.div`
  position: absolute;
  top: 8px;
  right: -5px;
  background-color: var(--bgColor);
  padding: 9px;
  color: ${COLORS.white};
  font-weight: ${WEIGHTS.boldish};
  font-size: 14px;
  border-radius: 2px;
`

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
