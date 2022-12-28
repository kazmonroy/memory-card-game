import styled from 'styled-components';
const Card = ({ img, chooseCard, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      chooseCard();
    }
  };
  return (
    <CardStyled>
      <CardsContainer flipped={flipped}>
        <img src={img} alt='' className='front' />
        <img
          src='./cover.jpeg'
          alt=''
          className='cover'
          onClick={handleClick}
        />
      </CardsContainer>
    </CardStyled>
  );
};

const CardStyled = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;

  img {
    cursor: pointer;
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const CardsContainer = styled.div`
  .front {
    position: absolute;
    transition: all 3s ease-in;
    transform: rotateY(${(props) => (props.flipped ? '0deg' : '90deg')});
  }

  .cover {
    transition: all 3s ease-in;
    transform: rotateY(${(props) => (props.flipped ? '90deg' : '0deg')});
  }
`;

export default Card;
